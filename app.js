const nodemailer = require("nodemailer");
const path = require ('path')

const transporter = nodemailer.createTransport({
   service: "Trustmedis",
   host:"smtp.gmail.com",
   port: 465,
   secure:true,
   auth: {
      user: "yogadwisatya.giri@gmail.com",
      pass: "eoeonfzpgzpxfbbo"
   }
});

// Attach PDF
const filePath = path.join('D:\\Yoga\\Visual Studio Code\\trustmedis-v2\\gmail-sender\\kontrak-locked.pdf');

const mailOptions = {
  from: 'yogadwisatya.giri@gmail.com', // Pastikan ini adalah alamat email yang valid
  to: 'mhmdryhan02@gmail.com',
  subject: 'Trustmedis',
  text: 'Tes 123',
  attachments: [
    {
      filename: 'Kontrak.pdf', // Nama file yang akan muncul di email
      path: filePath, // Jalur ke file PDF
      contentType: 'application/pdf', // Tipe konten file
    },
  ],
};

transporter.sendMail(mailOptions, function(error, info){
   if(error){
      console.log(error);
   }else{
      console.log("Email sent: " + info.response);
   }
});

//Locker PDF

const { exec } = require('child_process');

function lockPDF(inputPath, outputPath, password) {
  const command = `"C:\\Program Files\\qpdf 11.9.1\\bin\\qpdf.exe" --encrypt ${password} ${password} 256 -- "${inputPath}" "${outputPath}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`PDF berhasil dikunci dan disimpan di ${outputPath}`);
  });
}

// Panggil fungsi dengan path ke file PDF yang benar
lockPDF(
  'D:\\Yoga\\Visual Studio Code\\trustmedis-v2\\gmail-sender\\trustmedis.pdf',
  'D:\\Yoga\\Visual Studio Code\\trustmedis-v2\\gmail-sender\\kontrak-locked.pdf',
  'ryhan123'
);

