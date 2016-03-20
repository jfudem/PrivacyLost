<?php
//JonathanFudem.com Web Beacon
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

date_default_timezone_set('America/Los_Angeles');

$time = rawurlencode(date("D dS M,Y h:i a"));
$query = isset($_SERVER['QUERY_STRING']) ? "beacon/".rawurlencode($_SERVER['QUERY_STRING']) : "beacon/no_query";
$ip = isset($_SERVER['REMOTE_ADDR']) ? rawurlencode($_SERVER['REMOTE_ADDR']) : "no_ip";
$host = isset($_SERVER['REMOTE_ADDR']) ? rawurlencode(gethostbyaddr($_SERVER['REMOTE_ADDR'])) : "no_host";
$ua = isset($_SERVER['HTTP_USER_AGENT']) ? rawurlencode($_SERVER['HTTP_USER_AGENT']) : "no_user_agent";
$referer = isset($_SERVER['HTTP_REFERER']) ? rawurlencode($_SERVER['HTTP_REFERER']) : "direct";

$geoip = isset($_SERVER['REMOTE_ADDR']) ? rawurlencode(file_get_contents('http://freegeoip.net/json/'.rawurlencode($_SERVER['REMOTE_ADDR']))) : null;
$friendlyua = isset($_SERVER['HTTP_USER_AGENT']) ? rawurlencode(file_get_contents('http://www.useragentstring.com/?uas='.rawurlencode($_SERVER['HTTP_USER_AGENT']).'&getText=all')) : null;

header("content-type: image/gif");
//43byte 1x1 transparent pixel gif
echo base64_decode("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");

//Redirect Form Field ID is Different for JonathanFudem.com and Indulgencesdesigns.com
$lines = file("https://docs.google.com/forms/d/1rrDe3o247HFXODdpGpKSASGBJ4aItbvSZKSK_DM1i1U/formResponse?ifq&entry.202717044=".$time ."&entry.1388108608=".$query."&entry.1366919222=".$ip."&entry.228601374=".$host."&entry.525632565=".$ua."&entry.1713784820=".$referer."&entry.51352101=beacon.gif&entry.1923984710=".$geoip."&entry.1896468032=".$friendlyua."&submit=Submit");

exit;
	
?>