<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace contact@example.com with your real receiving email address
    $to = 'akk85@cornell.edu';
    
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($to, $subject, $email_content, $email_headers)) {
        echo 'Message sent successfully!';
    } else {
        echo 'Failed to send the message. Please try again later.';
    }
} else {
    echo 'Invalid request method';
}
?>
