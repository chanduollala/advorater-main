import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    constructor() {
    }


    key = CryptoJS.enc.Utf8.parse('1602073307612345');
    iv = CryptoJS.enc.Utf8.parse('1602073307612345');

    encryptUsingAES256(request: string) {
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(request), this.key,
            {
                keySize: 128 / 8,
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
    }

    decryptUsingAES256(encrypted: string) {
        return CryptoJS.AES.decrypt(encrypted, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }
}
