const verifEmailTemplate = (
  activeLink
) => `<body style='margin:0;padding:0'><div style="background: rgba(204,204,204,0.1); padding:20px ; height:100vh; ">
<div style=' box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white; text-align:center ; color:#262a2d;
            '>
 <img src="" width=200 />
  <h3>Allons Confirmons votre adresse e-mail.</h3>
  <hr style="border-color:#daf1fb"/>
  <p>
Veuillez cliquer sur le bouton ci-dessous pour confirmer votre adresse e-mail et terminer votre inscription inaya.
  </p>
  <a href='${activeLink}'>
  <button
          style='  padding: 15px 40px;
  border-radius: 5px;
  background-color: #49b9ec;
                 border:2px solid #49b9ec;
                 color:white;
                 font-weight:600;
                 font-size:14px;
                 box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.16);'>Confirm email</button></a>
  
  <p>Bonne journée</p>
  
</div>
</div>
</body>`;

module.exports = verifEmailTemplate;
