const express = require("express");
const bodyParser=require("body-parser");
const nodemailer= require("nodemailer");
const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/api/form",(req,res)=>{
    nodemailer.createTestAccount((err,account)=>{
        const htmlEmail=`
        <h3>Email enviado</h3>
        <ul>
            <li>Email:${req.body.email}</li>
            <li>Asunto:${req.body.asunto}</li>
        </ul>
        <h3>Mensaje</h3>
        <p>${req.body.mensaje}</p>
        `;
        let transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            auth:{
                user:"ciberchipiriguino@gmail.com",
                pass:"Pepelu93$"
            }
        });
        var files=req.file;
        let mailOptions={
            from:req.body.email,
            to:"ciberchipiriguino@gmail.com",
            replyTo:"ciberchipiriguino@gmail.com",
            subject:req.body.asunto,
            text:req.body.mensaje,
            html:htmlEmail,

        };
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return console.log(err);
            }
            console.log("mensaje enviado", info.mensaje);
            console.log("Url del mensaje", nodemailer.getTestMessageUrl(info))
        });
    });
});

const PORT=process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Servidor a tope en el puerto ${PORT}`);
});