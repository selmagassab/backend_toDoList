const resetPasswordTemplate = (
  email,
  password
) => `<body style='margin:0;padding:0'><div style="background: rgba(204,204,204,0.1); padding:20px ; height:100vh; ">
<div style=' box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white; text-align:center ; color:#262a2d;
            '>
 <img src="" width=200 />
  <h3>
Réinitialisation du mot de passe.</h3>
  <hr style="border-color:#daf1fb"/>
 <p>
  Suite a votre demande de réinitialiser votre mot passe</p>
  <p><strong>ci-doussous vous trouverez vos nouveau données de connexion:</strong></p>
  <h4>Email: ${email}</h4>
  <h4>Mot de passe: ${password}</h4>
  
  <p>Bonne journée</p>

  
</div>
</div>
</body>`;

module.exports = resetPasswordTemplate;
