var express = require('express');
var router = express.Router();


/*   PostgresDB  */
const configjs = require("./config")
const pool = configjs.postgre_pool;

const Query = require('pg').Query;

//Search list
router.get('/api/node/ms-contentlist', contentlist);


//Search Id
router.get('/api/node/ms-contentlist_id', contentlist_id);

//add Movie
router.post('/api/node/ms-addContent' , addContent);

//update Movie
router.post('/api/node/ms-updateContent' , updateContent);

//DeleteMovie
router.post('/api/node/ms-deleteContent',deleteContent);


//Find Type1
function contentlist(req,res,next){ 

    //전체리스트
    const pg_query = 
    ` SELECT * FROM CONTENT CT 
        INNER JOIN USERS U on U.user_id = CT.user_id 
        ORDER BY CT.created_at DESC
    `;
    console.log("Query ==>",pg_query);

    const sendquery = new Query(pg_query);

    pool.query(sendquery);
    
    var rows = []; 
    sendquery.on("row",row=>{ rows.push(row); });
    
    sendquery.on('end', () => { 
        console.log(rows); 
        console.log('query done'); 
        res.send(rows); res.status(200).end(); 
    }); 

    sendquery.on('error', err => { 
        console.error(err.stack) 
    });
}

//Search detail
function contentlist_detail(req,res,next){ 
    
    var param_contentid = req.body.id ||req.query.id || req.params.id;
    
    var pg_query = 
        ` SELECT * FROM CONTENT CT 
        INNER JOIN USERS U on U.user_id = CT.user_id 
        WHERE CT.content_id = $1`;
    
    console.log("Query ==>",pg_query);
    console.log("param_contentid ==>",param_contentid);

    const sendquery = new Query(pg_query,[param_contentid]);
    pool.query(sendquery);
    var rows = []; 
    sendquery.on("row",row=>{ rows.push(row); });
}

function contentlist_id(req,res,next){ 
    
    var param_contentid = req.body["content_id"] || req.body.content_id || params.content_id;
    
    var pg_query = 
        ` SELECT * FROM CONTENT CT 
        INNER JOIN USERS U on U.user_id = CT.user_id 
        WHERE CT.content_id = $1`;

    var sendquery = client.query(pg_query,[param_contentid]); 
    var rows = []; 
    sendquery.on('row', function(row){ 
        rows.push(row); 
    }); 
    
    sendquery.on('end', function(row,err){ 
        res.render('index', { 
            title: 'Express', data:rows 
        }); 
    }); 
    
    sendquery.on('error', function(error) { 
        console.log("ERROR!!" + error); 
        res.render('index', {
            title: title, data: null, message: "ERROR is occured!" 
        }); 
    });
}

function addContent(req, res , next ){
    var param_userid = req.body.user_id || req.query.user_id || req.param.user_id;
    var param_title = req.body.title || req.query.title || req.param.title;
    var param_context = req.body.context ||req.query.context || req.param.context;

    var pg_query = 
    ` INSERT INTO CONTENT (user_id,title,context,created_at,update_at) values ($1, $2, $3,now(),null)`;
    console.log("Query ==>",pg_query);

    const sendquery = new Query(pg_query,[param_userid,param_title,param_context]);
    pool.query(sendquery);
    var rows = []; 

    sendquery.on("row",row=>{ 
        rows.push(row); 
    });
    
    sendquery.on('end', () => { 
        console.log(rows); 
        console.log('query done'); 
        res.send(rows); res.status(200).end(); 
    }); 

    sendquery.on('error', err => { 
        console.error(err.stack) ;
    });
}


function updateContent(req, res , next ){
    var param_title = req.body.title || req.query.title || req.param.title;
    var param_context = req.body.context || req.query.context || req.param.context;
    var param_contentid = req.body.content_id || req.query.content_id || req.param.content_id;
    console.log("param_title ==>",param_title);
    console.log("param_context ==>",param_context);
    console.log("param_contentid ==>",param_contentid);

    //업데이트
    var pg_query = " UPDATE CONTENT SET title = $1, context = $2 WHERE content_id = $3";
    console.log("Query ==>",pg_query);

    const sendquery = new Query(pg_query,[param_title,param_context,param_contentid]);
    pool.query(sendquery);
    var rows = []; 

    sendquery.on("row",row=>{ 
        rows.push(row); 
    });
    
    sendquery.on('end', () => { 
        console.log(rows); 
        console.log('query done'); 
        res.send(rows); res.status(200).end(); 
    }); 

    sendquery.on('error', err => { 
        console.error(err.stack) ;
    });
}

function deleteContent(req , res , next){
    var param_contentid = req.body.content_id || req.query.content_id || req.param.content_id;
    
    //삭제
    const pg_query = `delete from content where content_id = $1`;
    console.log("Query ==>",pg_query);
    console.log("param_contentid ==>",param_contentid);
    const sendquery = new Query(pg_query,[param_contentid]);
    pool.query(sendquery);
    var rows = []; 

    sendquery.on("row",row=>{ 
        rows.push(row); 
    });
    
    sendquery.on('end', () => { 
        console.log(rows); 
        console.log('query done'); 
        res.send(rows); res.status(200).end(); 
    }); 

    sendquery.on('error', err => { 
        console.error(err.stack) ;
    });
    
}
module.exports = router;