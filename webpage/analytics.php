<?php
include_once('config.php');

$validCategories = array(
    'firefox/homepage-button' => true,
    'firefox/context-menu-item' => true,
);

if( $_POST['data'] ) {
    $data = json_decode($_POST['data']);
    if( !empty($data->category) && in_array($data->category, $validCategories) ) {
        $analytics = new Analytics();
        $analytics->saveAnalytics($data);
    }
} else if( $_GET['show-analytics'] ) {
    $analytics = new Analytics();
    $data = $analytics->getAnalytics();
    echo '<pre>';
    foreach($data as $row) {
        echo $row['category_name'] . ': ' . $row['count'] . PHP_EOL;
    }
    echo '</pre>';
} else {
    header("HTTP/1.0 400 Bad Request");
    exit;
}

class Analytics {
    private $pdo = null;
    private $table = 'analytics';

    public function __construct() {
        try {
            $this->pdo = new PDO(
                sprintf('mysql:dbname=%s;host=%s', DB_NAME, DB_HOST), DB_USER, DB_PASS
            );
            $this->pdo->exec("SET CHARACTER SET utf8");
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die('Database connection failed: '.$e->getMessage());
        } catch(Exception $e) {
            die('Something went wrong: '.$e->getMessage());
        }
    }

    public function saveAnalytics($data) {
        $sql = 'insert into '.$this->table.' (timestamp, category_name, action, label) values (?, ?, ?, ?)';

        $stm = $this->pdo->prepare($sql);
        $stm->bindParam(1, time(), PDO::PARAM_INT);
        $stm->bindParam(2, $data->category, PDO::PARAM_STR);
        $stm->bindParam(3, $data->action, PDO::PARAM_STR);
        $stm->bindParam(4, $data->label, PDO::PARAM_STR);

        $stm->execute();
    }

    public function getAnalytics() {
        $sql = 'select category_name, count(timestamp) as count from '.$this->table.' group by category_name';
        $res = array();

        try {
            $stm = $this->pdo->prepare($sql);
            $stm->execute();
            $res = $stm->fetchAll();
        } catch(Exception $e) {
            $res['error'] = $e->getMessage();
        }

        return $res;
    }
}
