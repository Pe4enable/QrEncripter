import React from 'react'
import QRCode from 'qrcode.react'
import forge from 'node-forge'
import buffer from 'buffer'

const data="http://facebook.github.io/react/"
const password="testPassword"
export default class QrGenerator extends React.Component {

    constructor(props) {
        super(props);
    }
    encript = (data, password) => {
        //to do add options of input salt and number of iterations
        var keySize = 24;
        var ivSize = 8;

        // get derived bytes
        // Notes:
        // 1. If using an alternative hash (eg: "-md sha1") pass
        //   "forge.md.sha1.create()" as the final parameter.
        // 2. If using "-nosalt", set salt to null.
        var salt = forge.random.getBytesSync(8);
        // var md = forge.md.sha1.create(); // "-md sha1"
        var derivedBytes = forge.pbe.opensslDeriveBytes(
            password, salt, keySize + ivSize/*, md*/);
        var buffer = forge.util.createBuffer(derivedBytes);
        var key = buffer.getBytes(keySize);
        var iv = buffer.getBytes(ivSize);

        var cipher = forge.cipher.createCipher('3DES-CBC', key);
        cipher.start({iv: iv});
        var dataBynary = buffer.getBytes(data)
        cipher.update(forge.util.createBuffer(dataBynary));
        cipher.finish();

        var output = forge.util.createBuffer();

        // if using a salt, prepend this to the output:
        if(salt !== null) {
            output.putBytes('Salted__'); // (add to match openssl tool output)
            output.putBytes(salt);
        }
        output.putBuffer(cipher.output);
        // outputs encrypted hex
        console.log(output.toHex());
    }

    render () {
        return (
            <div>
                <QRCode value={data} />
                <button onClick={(e) => this.encript(data,password)}>
                    Encrypt
                </button>
            </div>
        )
    }
}