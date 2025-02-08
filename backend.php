
<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);
header('Access-Control-Allow-Origin:http://muniyarajbalamurugan.wuaze.com');
$conn=mysqli_connect('sql209.infinityfree.com','if0_37056699','mgAwAoUzIoOsuW','if0_37056699_bmr');
header("content-type:apllication/json");
if($_SERVER['REQUEST_METHOD']=='POST')
{
$input=file_get_contents('php://input');
$data=json_decode($input,true);
if($conn)
{
    
    $name=$data['name'] ;
    $mail=$data['mail']  ;
    $message=$data['Message'] ;
    $sql="INSERT INTO portfolio (name,mail,message) VALUES ('$name','$mail','$message')";
    $result=mysqli_query($conn,$sql);
    if($result)
    {
        $response=['message'=>'Data Inserted'];
        echo json_encode($response);
    }
}
}
else if($_SERVER['REQUEST_METHOD']=='GET')
{
    $array=[];
    $sql='SELECT date,name,mail,message FROM portfolio';
    $result=mysqli_query($conn,$sql);
    if($result)
    {
        $num=mysqli_num_rows($result);
        if($num>0)
        {
            while($row=mysqli_fetch_assoc($result))
            {
            array_push($array,$row);
            }
            echo json_encode($array);
        }
    }
    else
    {
        echo json_encode(['message'=>'no data']);
    }
}
else
{
    echo json_encode(['message'=>'only get and post method only accepted']);
}

?>