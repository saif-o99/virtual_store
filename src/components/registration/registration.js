import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {auth, RegisterWithEmailAndPassword, SignInWithGoogle, users} from "../../firebase.utils";
import {IconButton} from "@material-ui/core";

import {Link, Redirect} from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GoogleIcon from '../assets/google.png'
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    background: {
        display: "flex",
        justifyContent: "center",
        background: '#f7f8fb',
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        [theme.breakpoints.down('xs')]: {
            justifyContent: "flex-start",
        },
    },
    card: {
        width: "100%",
        position: "relative",
        borderRadius: "8px",
        flexDirection: "column",
        display: "flex",
        overflow: "hidden",
        boxSizing: "border-box",
        background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.5), rgba(255,255,255,0.0) 60%)",
        boxShadow: `16px 24px 32px 8px rgba(200,200,200,0.02)`,
        padding: "48px 56px",
    },

}));


function Register(location, history) {
    const classes = useStyles();

    const [error, setError] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        auth.getRedirectResult().then(async (result) => {
            if (result.operationType === "signIn") {
                let user = result.user;
                if (user) {
                    setAuthenticated(true);
                } else {
                    history.push("/register");
                }
            } else {

            }
        }).catch((error) => {
            console.log(error);
            setError(error.message)
        });
    });

    /*    useEffect(() => {
            if (isAuthenticated)
                setAuthenticated(true);
        }, [isAuthenticated]);*/


    // Handle Register

    const register = (e) => {
        e.preventDefault()
        const {email, password, firstName, lastName, phone} = e.target.elements;
        console.log(email.value, password.value, firstName.value, lastName.value)
        if (email.value === "" || password.value === "" || firstName.value === "" || lastName.value === "" ) {
            setError("Please Fill all the Fields")
            setPage(0);
        } else {
            RegisterWithEmailAndPassword(
                (email.value).toString(),
                password.value
            ).then(async (result) => {
                let user = result.user;
                if (user) {
                    let userData = {
                        uid: user.uid, email: user.email,
                        firstName: firstName.value, lastName: lastName.value,
                        phoneNumber: phone.value
                    };
                    await users.doc(user.uid).set({...userData});
                    setAuthenticated(true);
                } else {
                    setError("Something went wrong on our side.")
                }
            }).catch(err => {
                console.log(err);
                switch (err.code) {
                    case "auth/email-already-in-use":
                        return setError("Account already exists.");
                    case "auth/weak-password":
                        return setError("Password must contain 6+ characters, a symbol & a number.");
                    case "auth/invalid-email":
                        return setError("Please enter a valid Email Address.");
                    default:
                        return setError("Something went wrong on our side.");
                }
            });
        }

    };

    // Handle Google Sign In
    const loginWithGoogle = () => {
        history.push("/register?auth=google");
        try {
            SignInWithGoogle().then(() => {
            }).catch(err => {
                let errorMessage = err.message;
                setError(errorMessage);
            });
        } catch (e) {
            let errorMessage = e.message;
            setError(errorMessage);
        }
    };


    return (
        <div className={classes.background}>
            {
                authenticated &&
                <Redirect to={"/"}/>
            }
            <div style={{height: "64px"}}/>
            <Grid justify={"center"} component={"div"} container>
                <Grid component={"div"} xl={8} lg={8} md={8} sm={8} xs={12} item
                      style={{display: "flex", justifyContent: "center"}}>
                    <div className={classes.card}>
                        <form onSubmit={register}>
                            <div style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                                marginBottom: "16px"
                            }}>
                                <Typography variant={"h5"}>Sign Up</Typography>
                                <Typography variant={"body2"}>
                                    <span style={{opacity: "0.6", marginRight: "8px"}}>Have an account?</span>
                                    <Typography variant={"body2"} component={"span"}><Link to={"/login"}
                                                                                           style={{color: "blue"}}>Sign
                                        In</Link></Typography>
                                </Typography>
                            </div>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                <div>
                                    <div style={{display: "flex"}}>
                                        <TextField label="First Name" variant="outlined" name={"firstName"}/>
                                        <div style={{width: "16px"}}/>
                                        <TextField label="Last Name" variant="outlined" name={"lastName"}/>
                                    </div>
                                    <div style={{height: '15px'}}/>
                                    <TextField label="Enter Your Email" variant="outlined" type={"email"} name={"email"}
                                               fullWidth/>
                                    <div style={{height: '15px'}}/>
                                    <TextField label="Set Password" variant="outlined" type={"password"}
                                               name={"password"}
                                               fullWidth/>
                                    <div style={{height: '10px'}}/>
                                    <TextField label="Enter Phone Number" variant="outlined" type={"number"}
                                               name={"phone"}
                                               fullWidth/>
                                    <div style={{height: '10px'}}/>
                                </div>
                                <div style={{width:'400px'}}>
                                    <TextField label="Address Line 1" variant="outlined" name={"address1"} fullWidth/>
                                    <div style={{height: "15px"}}/>
                                    <TextField label="Address Line 2" variant="outlined" name={"address2"} fullWidth/>
                                    <div style={{height: '15px'}}/>
                                    <TextField label="City" variant="outlined" name={"city"}
                                               fullWidth/>
                                    <div style={{height: '15px'}}/>
                                    <TextField label="Postal Code" variant="outlined"
                                               name={"postal"}
                                               fullWidth/>

                                </div>
                                </div>
                            <div style={{height: '10px'}}/>
                            {error !== "" &&
                            <Alert severity="error">{error}</Alert>
                            }
                            <div style={{height: '10px'}}/>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button type={"submit"} style={{
                                    marginTop: "24px",
                                    background: "black",
                                    color: 'white',
                                    padding: "12px 50px"
                                }}> Join Us </Button>
                            </div>
                            <div style={{display: "flex", margin: "24px 5%", alignItems: "center"}}>
                                <div style={{flex: "1", height: "2px", background: "grey", opacity: "0.1"}}/>
                                <Typography variant={"body2"} component={"span"}
                                            style={{color: "grey", margin: "0 12px"}}>or</Typography>
                                <div style={{flex: "1", height: "2px", background: "grey", opacity: "0.1"}}/>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <IconButton background={"white"} onClick={loginWithGoogle}
                                            style={{borderRadius: '30px', background: 'white', fontSize: "14px"}}
                                ><img src={GoogleIcon} width={20} height={20} style={{marginRight: "15px"}}/>Continue
                                    with Google</IconButton>
                            </div>
                        </form>
                    </div>

                </Grid>
            </Grid>
            <div style={{height: "64px"}}/>
        </div>
    );
}

export default Register;