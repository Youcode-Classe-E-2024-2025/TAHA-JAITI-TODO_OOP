<?php

require_once __DIR__ . '/src/loader.php';

$db = new Database();

$conn = $db->getConnection();

$router = new Router();

$userController = new UserController($conn);

$router->addRoute('POST', '/register', function() use ($userController) {
    $userController->registerUser();
});

$router->addRoute('POST', '/login', function() use ($userController) {
    $userController->loginUser();
});

$router->addRoute('POST', '/create', function() use ($conn) {
    $taskType = $_GET['type'] ?? null;
    $taskController = new TaskController($conn,$taskType);
    $taskController->createTask();
});

$router->addRoute('POST', '/assigntask', function() use ($conn) {
    $taskController = new TaskController($conn);
    $taskController->assignUser();
});

$router->handleRequest($_SERVER['REQUEST_METHOD'], parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
