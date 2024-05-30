/*
 * @Author: zsdddz
 * @Date: 2024-04-21 13:11:32
 * @LastEditTime: 2024-04-22 09:50:52
 */


export default class ByteBuffer {
    Type_Byte: number = 1;
    Type_Short: number = 2;
    Type_UShort: number = 3;
    Type_Int32: number = 4;
    Type_UInt32: number = 5;
    Type_String: number = 6;//变长字符串，前两个字节表示长度
    Type_VString: number = 7;//定长字符串
    Type_Int64: number = 8;
    Type_Float: number = 9;
    Type_Double: number = 10;
    Type_ByteArray: number = 11;
    _org_buf!: any;
    _offset: number = 0
    _list: any[] = [];
    _littleEndian: boolean = false;
    arrayBuf: any;
    offset?: number;

    constructor(arrayBuf: any, offset?: number) {
        this._org_buf = arrayBuf ? (arrayBuf.constructor == DataView ? arrayBuf
            : (arrayBuf.constructor == Uint8Array ? new DataView(arrayBuf.buffer, offset) : new DataView(arrayBuf, offset))) : new DataView(new Uint8Array([]).buffer);
        this.arrayBuf = arrayBuf;
        this.offset = offset;

        // if (!ArrayBuffer.prototype.slice) {
        //     ArrayBuffer.prototype.slice = function (start, end) {
        //         var that = new Uint8Array(this);
        //         if (end == undefined) end = that.length;
        //         var result = new ArrayBuffer(end - start);
        //         var resultArray = new Uint8Array(result);
        //         for (var i = 0; i < resultArray.length; i++)
        //             resultArray[i] = that[i + start];
        //         return result;
        //     }
        // }
    }

    //指定字节序 为BigEndian
    bigEndian() {
        this._littleEndian = false;
        return this;
    };

    //指定字节序 为LittleEndian
    littleEndianfunction() {
        this._littleEndian = true;
        return this;
    };

    utf8Write(view, offset, str) {
        var c = 0;
        for (var i = 0, l = str.length; i < l; i++) {
            c = str.charCodeAt(i);
            if (c < 0x80) {
                view.setUint8(offset++, c);
            } else if (c < 0x800) {
                view.setUint8(offset++, 0xc0 | (c >> 6));
                view.setUint8(offset++, 0x80 | (c & 0x3f));
            } else if (c < 0xd800 || c >= 0xe000) {
                view.setUint8(offset++, 0xe0 | (c >> 12));
                view.setUint8(offset++, 0x80 | (c >> 6) & 0x3f);
                view.setUint8(offset++, 0x80 | (c & 0x3f));
            } else {
                i++;
                c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
                view.setUint8(offset++, 0xf0 | (c >> 18));
                view.setUint8(offset++, 0x80 | (c >> 12) & 0x3f);
                view.setUint8(offset++, 0x80 | (c >> 6) & 0x3f);
                view.setUint8(offset++, 0x80 | (c & 0x3f));
            }
        }
    }



    byte(val, index) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getUint8(this._offset, this._littleEndian));
            this._offset += 1;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0);
            this._offset += 1;
        }
        return this;
    };


    short(val?: number, index?: number) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getInt16(this._offset, this._littleEndian));
            this._offset += 2;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_Short, d: val, l: 2 });
            this._offset += 2;
        }
        return this;
    };

    ushort(val, index) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getUint16(this._offset, this._littleEndian));
            this._offset += 2;
        } else {
            // , {t: this.Type_UShort, d: val, l: 2}
            this._list.splice(index != undefined ? index : this._list.length, 0);
            this._offset += 2;
        }
        return this;
    };

    int32(val?, index?) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getInt32(this._offset, this._littleEndian));
            this._offset += 4;
        }
        else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_Int32, d: val, l: 4 });
            this._offset += 4;
        }
        return this;
    };

    uint32(val, index) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getUint32(this._offset, this._littleEndian));
            this._offset += 4;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_UInt32, d: val, l: 4 });
            this._offset += 4;
        }
        return this;
    };

    /**
     * 新加的方法，获取bytebuffer的长度
     */
    blength() {
        return this._offset;
    };

    /**
         * 变长字符串 前4个字节表示字符串长度
         **/
    string(val, index) {
        if (arguments.length == 0) {
            var len: any = this._org_buf.getInt32(this._offset, this._littleEndian);
            this._offset += 4;
            this._list.push(this.utf8Read(this._org_buf, this._offset, len));
            this._offset += len;
        } else {
            var len: any = 0;
            if (val) {
                len = this.utf8Length(val);
            }
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_String, d: val, l: len });
            this._offset += len + 4;
        }
        return this;
    };

    utf8Length(str) {
        var c = 0, length = 0;
        for (var i = 0, l = str.length; i < l; i++) {
            c = str.charCodeAt(i);
            if (c < 0x80) {
                length += 1;
            } else if (c < 0x800) {
                length += 2;
            } else if (c < 0xd800 || c >= 0xe000) {
                length += 3;
            } else {
                i++;
                length += 4;
            }
        }
        return length;
    }

    utf8Read(view, offset, length) {
        var string = '', chr = 0;
        for (var i = offset, end = offset + length; i < end; i++) {
            var byte = view.getUint8(i);
            if ((byte & 0x80) === 0x00) {
                string += String.fromCharCode(byte);
                continue;
            }
            if ((byte & 0xe0) === 0xc0) {
                string += String.fromCharCode(
                    ((byte & 0x0f) << 6) |
                    (view.getUint8(++i) & 0x3f)
                );
                continue;
            }
            if ((byte & 0xf0) === 0xe0) {
                string += String.fromCharCode(
                    ((byte & 0x0f) << 12) |
                    ((view.getUint8(++i) & 0x3f) << 6) |
                    ((view.getUint8(++i) & 0x3f) << 0)
                );
                continue;
            }
            if ((byte & 0xf8) === 0xf0) {
                chr = ((byte & 0x07) << 18) |
                    ((view.getUint8(++i) & 0x3f) << 12) |
                    ((view.getUint8(++i) & 0x3f) << 6) |
                    ((view.getUint8(++i) & 0x3f) << 0);
                if (chr >= 0x010000) { // surrogate pair
                    chr -= 0x010000;
                    string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
                } else {
                    string += String.fromCharCode(chr);
                }
                continue;
            }
            throw new Error('Invalid byte ' + byte.toString(16));
        }
        return string;
    }


    /**
     * 定长字符串 val为null时，读取定长字符串（需指定长度len）
     **/
    vstring(val?, len?, index?) {
        if (!len) {
            throw new Error('vstring must got len argument');
            return this;
        }
        if (val == undefined || val == null) {
            var vlen = 0;//实际长度
            for (var i = this._offset; i < this._offset + len; i++) {
                if (this._org_buf.getUint8(i) > 0) vlen++;
            }
            this._list.push(this.utf8Read(this._org_buf, this._offset, vlen));
            this._offset += len;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_VString, d: val, l: len });
            this._offset += len;
        }
        return this;
    };



    int64(val, index) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getFloat64(this._offset, this._littleEndian));
            this._offset += 8;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_Int64, d: val, l: 8 });
            this._offset += 8;
        }
        return this;
    };

    float(val, index) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getFloat32(this._offset, this._littleEndian));
            this._offset += 4;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_Float, d: val, l: 4 });
            this._offset += 4;
        }
        return this;
    };

    double(val, index) {
        if (arguments.length == 0) {
            this._list.push(this._org_buf.getFloat64(this._offset, this._littleEndian));
            this._offset += 8;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_Double, d: val, l: 8 });
            this._offset += 8;
        }
        return this;
    };

    /**
     * 写入或读取一段字节数组
     **/
    byteArray(val, len, index?) {
        if (!len) {
            throw new Error('byteArray must got len argument');
            return this;
        }
        if (val == undefined || val == null) {
            var arr = new Uint8Array(this._org_buf.buffer.slice(this._offset, this._offset + len));
            this._list.push(arr);
            this._offset += len;
        } else {
            this._list.splice(index != undefined ? index : this._list.length, 0, { t: this.Type_ByteArray, d: val, l: len });
            this._offset += len;
        }
        return this;
    };

    /**
     * 解包成数据数组
     **/
    unpack() {
        return this._list;
    };

    /**
     * 打包成二进制,在前面加上4个字节表示包长
     **/
    packWithHead() {
        return this.pack(true);
    };

    /**
         * 打包成二进制
         * @param ifHead 是否在前面加上4个字节表示包长
         **/
    pack(ifHead) {
        this._org_buf = new DataView(new ArrayBuffer((ifHead) ? this._offset + 4 : this._offset));
        var offset = 0;
        if (ifHead) {
            this._org_buf.setUint32(offset, this._offset, this._littleEndian);
            offset += 4;
        }
        for (var i = 0; i < this._list.length; i++) {
            switch (this._list[i].t) {
                case this.Type_Byte:
                    this._org_buf.setInt8(offset, this._list[i].d);
                    offset += this._list[i].l;
                    break;
                case this.Type_Short:
                    this._org_buf.setInt16(offset, this._list[i].d, this._littleEndian);
                    offset += this._list[i].l;
                    break;
                case this.Type_UShort:
                    this._org_buf.setUint16(offset, this._list[i].d, this._littleEndian);
                    offset += this._list[i].l;
                    break;
                case this.Type_Int32:
                    this._org_buf.setInt32(offset, this._list[i].d, this._littleEndian);
                    offset += this._list[i].l;
                    break;
                case this.Type_UInt32:
                    this._org_buf.setUint32(offset, this._list[i].d, this._littleEndian);
                    offset += this._list[i].l;
                    break;
                case this.Type_String:
                    //前4个字节表示字符串长度
                    this._org_buf.setUint32(offset, this._list[i].l, this._littleEndian);
                    offset += 4;
                    this.utf8Write(this._org_buf, offset, this._list[i].d);
                    offset += this._list[i].l;
                    break;
                case this.Type_VString:
                    this.utf8Write(this._org_buf, offset, this._list[i].d);
                    var vlen = this.utf8Length(this._list[i].d);//字符串实际长度
                    //补齐\0
                    for (var j = offset + vlen; j < offset + this._list[i].l; j++) {
                        this._org_buf.setUint8(j, 0);
                    }
                    offset += this._list[i].l;
                    break;
                case this.Type_Int64:
                    this._org_buf.setFloat64(offset, this._list[i].d, this._littleEndian);
                    offset += this._list[i].l;
                    break;
                case this.Type_Float:
                    this._org_buf.setFloat32(offset, this._list[i].d, this._littleEndian);
                    offset += this._list[i].l;
                    break;
                case this.Type_Double:
                    this._org_buf.setFloat64(offset, this._list[i].d, this._littleEndian);
                    offset += this._list[i].l;
                    break;
                case this.Type_ByteArray:
                    var indx = 0;
                    for (var j = offset; j < offset + this._list[i].l; j++) {
                        if (indx < this._list[i].d.length) {
                            this._org_buf.setUint8(j, this._list[i].d[indx]);
                        } else {//不够的话，后面补齐0x00
                            this._org_buf.setUint8(j, 0);
                        }
                        indx++
                    }
                    offset += this._list[i].l;
                    break;
            }
        }
        return this._org_buf.buffer;
    };

    /**
     * 未读数据长度
     **/
    getAvailable() {
        if (!this._org_buf) return this._offset;
        return this._org_buf.buffer.byteLength - this._offset;
    };


}