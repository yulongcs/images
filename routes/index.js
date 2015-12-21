
/*
 * GET home page.
 */

var images = require("images")
,	fs = require('fs');

function getDate(date) {
	var Y = date.getFullYear();
	var M = date.getMonth()+1;
	if (M < 10) M = '0' + M;
	var D = date.getDate();
	if (D < 10) D = '0' + D;
	var h = date.getHours();
	if (h < 10) h = '0' + h;
	var m = date.getMinutes();
	if (m < 10) m = '0' + m;
	var s = date.getSeconds();
	if (s < 10) s = '0' + s;
	return (Y+'-'+M+'-'+D+' '+h+':'+m+':'+s);
}

exports.index = function(req, res){
	//获取user文件夹里的所有文件名
	fs.readdir('public/images/user', function(err, files){
		res.render('index', { title: 'GMTest by KIDx.'
							, time: (new Date()).getTime()
							, files: files
		});
	});
};

exports.imgUpload = function(req, res) {
	res.header('Content-Type', 'text/plain');
	var path = req.files.img.path;	//获取用户上传过来的文件的当前路径
	var sz = req.files.img.size;
	if (sz > 2*1024*1024) {
		fs.unlink(path, function() {	//fs.unlink 删除用户上传的文件
			res.end('1');
		});
	} else if (req.files.img.type.split('/')[0] != 'image') {
		fs.unlink(path, function() {
			res.end('2');
		});
	} else {
		images(images(path),100, 100, 150, 150)
		//images(path)
		//.size(150)
		.save('public/images/user/'+req.files.img.name,  {operation:100});
		fs.unlink(path, function() {
			res.end('3');
		});
	}
};