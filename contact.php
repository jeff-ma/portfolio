<?php
    function convertInput($input) {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input);
        return $input;
    }
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        // check for empty inputs and safeguard server by converting inputs
        $name = $_POST["name"];
        $email = $_POST["email"];
        $subject = $_POST["subject"];
        $message = $_POST["message"];
        $data = array();
        $errors = array();
        if(empty($name)) {
            $errors["name"] = "Do you have a name?";
        } else {
            $name = convertInput($name);
        }
        if(empty($email)) {
            $errors["email"] = "Where is the email address?";
        } elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors["email"] = "Email address doesn't look right.";
        } else {
            $email = convertInput($email);
        }
        if(empty($subject)) {
            $errors["subject"] = "Can you put in a subject?";
        } else {
            $subject = convertInput($subject);
        }
        if(empty($message)) {
            $errors["message"] = "Are you forgetting the message?";
        } else {
            $message = convertInput($message);
        }
        // send out the email 
        if(empty($errors)) {
            $message = "<p>New message from " . $name . " (" . $email . ")</p>" . "\r\n" . "<p>" . $message . "</p>";
            $headers  = "From: $name <noreply@jeffma.website> \r\n";
            $headers .= 'MIME-Version: 1.0' . "\r\n";
            $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
            // send email
            mail("jeffmaemail@gmail.com", $subject, $message, $headers);
            $data["success"] = true;
            $data["name"] = $name;
            $data["email"] = $email;
            $data["subject"] = $subject;
            $data["message"] = $message;
        } else {
            $data["success"] = false;
            $data["errors"] = $errors;
        }
        // send response back to client
        echo json_encode($data);
    }
?>