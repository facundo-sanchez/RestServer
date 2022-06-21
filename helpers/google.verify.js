const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_GOOGLE);

async function googleVerify(token=''){
    const ticket = await client.verifyIdToken({
        idToken:token,
        audience:process.env.CLIENT_GOOGLE
    });
    // const payload = ticket.getPayload();
    // const userid = payload['sub'];

    const {name,picture,email} = ticket.getPayload();

    return {
        name,
        picture,
        email
    }
}

module.exports = googleVerify;
