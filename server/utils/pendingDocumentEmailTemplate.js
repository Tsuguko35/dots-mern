
export const pendingDocumentEmailTemplate = (sender, documentName, date, time) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
            />
            <style>
            body{
                margin: 0;
                font-family: 'Poppins', sans-serif;
                background: #ffffff;
                font-size: 14px;
                background-color: #F4F4F4;
            }
            .wrapper{
                max-width: 680px;
                margin: 0 auto;
                margin-top: 30px;
                padding: 45px 30px 60px;
                background: #3A3535;
                background-image: url(https://img.hotimg.com/Mask-group.png);
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                border-radius: 5px;
                font-size: 14px;
                color: #434343;
            }
            .table{
                width: 100%
            }
            .table_row{
                height: 100px; 
                width: 100%; 
                display: flex; 
                justify-content: center;
                align-items: center;
                text-align: center;
                vertical-align: middle;
            }
            .table_row > td{
                width: 100%;
                display: flex; 
                justify-content: center;
                align-items: center;
            }
            .table_row > td > img {
                height:100px;
            }
            .main_container{
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 15px;
                text-align: center;
            }
            .message_container{
                width: 100%; 
                max-width: 489px; 
                margin: 0 auto;
            }

            .message_container > h1{
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #3A3535;
            }

            .message_container > p{
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
            }

            .message_container > .hello{
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
            }

            .message_container > p > span {
                font-weight: 600; 
                color: #3A3535;
            }
            .message_container > .otpCode{
                margin: 0;
                width: 100%;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                color: #FFF;
                background-color: #3A3535;
                border-radius: 15px;
            }

            .message_container > .otpCode > a{
                text-decoration: none;
                color: white;
            }

            footer{
                width: 100%;
                max-width: 490px;
                margin: 20px auto 0;
                text-align: center;
                border-top: 1px solid #e6ebf1;
            }

            footer > p{
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #FFF;
            }

            @media only screen and  (max-device-width: 768px), screen and (max-width: 768px) {
                body{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                }

                .wrapper{
                width: 100%;
                max-width: 100%;
                margin: 0;
                background-size: 94%;
                }

                .message_container{
                width: 100%; 
                max-width: 489px; 
                margin: 0 auto;
                }

            }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <header>
                    <table class="table">
                        <tbody>
                            <tr class="table_row">
                            <td>
                                <img
                                alt=""
                                src="https://img.hotimg.com/cictLogo512.png"
                                />
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </header>

                <main>
                    <div class="main_container">
                        <div class="message_container">
                        <h1>
                            Pending document
                        </h1>
                        <p class="hello">
                            Hello, A document named ${documentName} has been pending for 3 days
                        </p>
                        <p>
                            The pending document was forwarded to you by ${sender} on ${date}. Click the link bellow
                            to go to your pending documents to see the urgent document.
                        </p>
                        <p class="otpCode">
                            <a href="http://localhost:3000/Requests/Pending" target="_blank">Click here</a>
                        </p>
                        </div>
                    </div>
                </main>

                <footer>
                    <p>
                    College of Information and Communications Technology
                    </p>
                </footer>
            </div>
        </body>
    </html>
    `
}