import React from 'react';

function Contacto(){
    return(
        <div className="container">
            <div className="row align-items-start mt-3" style={{height:"70px"}}>
                <legend className="text-center header font-weight-bold text-primary">
                    CONTACTO
                </legend>
            </div>
            <div className="row align-items-start justify-content-around">
                <div className="col-lg-5">
                    <form className="form-horizontal" method="post" action="enviar.php">
                        <fieldset>
                        <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="fname" name="name" type="text" placeholder="Nombre" className="form-control" required />
                                </div>
                            </div>
                            <div className=" form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="lname" name="lname" type="text" placeholder="Apellido" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="email" name="email" type="text" placeholder="Email" className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-phone-square bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="phone" name="phone" type="text" placeholder="Teléfono" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-pencil-square-o bigicon"></i></span>
                                <div className="col-lg-10">
                                    <textarea className="form-control" id="message" name="message" placeholder="Consulta" rows="3" required></textarea>
                                </div>
                            </div>
                            <div className="col-lg-11 col-12 ml-lg-3 ml-0">
                                <button type="submit" className="btn btn-primary w-100 btn-lg">ENVIAR</button>
                            </div>
                            
                        </fieldset>
                    </form>
                </div>
            </div>    
            <div className="row align-items-start justify-content-around">
                <div className="col-lg-5">
{/*                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.730147448202!2d-58.49506408459104!3d-34.63625906672806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9bbbcac649f%3A0xa678cbdf56679c11!2sClom%20Propiedades!5e0!3m2!1ses-419!2sar!4v1600981424277!5m2!1ses-419!2sar" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"/> */}
                </div>
            </div>     
        </div>
    )
}

export default Contacto;