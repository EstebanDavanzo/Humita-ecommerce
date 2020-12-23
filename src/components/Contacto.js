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
                    <form className="form-horizontal" method="post" action="">
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
            </div>
            </div>     
        </div>
    )
}

export default Contacto;