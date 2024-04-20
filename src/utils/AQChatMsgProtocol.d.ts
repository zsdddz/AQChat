import * as $protobuf from "./protobuf";
import Long = require("long");
/** Namespace chat_msg. */
export namespace chat_msg {

    /** MsgCommand enum. */
    enum MsgCommand {
        USER_LOGIN_CMD = 0,
        USER_LOGIN_ACK = 1,
        HEART_BEAT_CMD = 2,
        HEART_BEAT_ACK = 3,
        JOIN_ROOM_CMD = 4,
        JOIN_ROOM_ACK = 5,
        CREATE_ROOM_CMD = 6,
        CREATE_ROOM_ACK = 7,
        LEAVE_ROOM_CMD = 8,
        LEAVE_ROOM_ACK = 9,
        SEND_MSG_CMD = 10,
        SEND_MSG_ACK = 11,
        BROADCAST_MSG_ACK = 12
    }

    /** Properties of a UserLoginCmd. */
    interface IUserLoginCmd {

        /** UserLoginCmd userName */
        userName?: (string|null);

        /** UserLoginCmd userAvatar */
        userAvatar?: (string|null);
    }

    /** Represents a UserLoginCmd. */
    class UserLoginCmd implements IUserLoginCmd {

        /**
         * Constructs a new UserLoginCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.IUserLoginCmd);

        /** UserLoginCmd userName. */
        public userName: string;

        /** UserLoginCmd userAvatar. */
        public userAvatar: string;

        /**
         * Creates a new UserLoginCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLoginCmd instance
         */
        public static create(properties?: chat_msg.IUserLoginCmd): chat_msg.UserLoginCmd;

        /**
         * Encodes the specified UserLoginCmd message. Does not implicitly {@link chat_msg.UserLoginCmd.verify|verify} messages.
         * @param message UserLoginCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.IUserLoginCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLoginCmd message, length delimited. Does not implicitly {@link chat_msg.UserLoginCmd.verify|verify} messages.
         * @param message UserLoginCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.IUserLoginCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLoginCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLoginCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.UserLoginCmd;

        /**
         * Decodes a UserLoginCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLoginCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.UserLoginCmd;

        /**
         * Verifies a UserLoginCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLoginCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLoginCmd
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.UserLoginCmd;

        /**
         * Creates a plain object from a UserLoginCmd message. Also converts values to other types if specified.
         * @param message UserLoginCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.UserLoginCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLoginCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserLoginCmd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a UserLoginAck. */
    interface IUserLoginAck {

        /** UserLoginAck userId */
        userId?: (number|null);

        /** UserLoginAck userName */
        userName?: (string|null);

        /** UserLoginAck userAvatar */
        userAvatar?: (string|null);
    }

    /** Represents a UserLoginAck. */
    class UserLoginAck implements IUserLoginAck {

        /**
         * Constructs a new UserLoginAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.IUserLoginAck);

        /** UserLoginAck userId. */
        public userId: number;

        /** UserLoginAck userName. */
        public userName: string;

        /** UserLoginAck userAvatar. */
        public userAvatar: string;

        /**
         * Creates a new UserLoginAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLoginAck instance
         */
        public static create(properties?: chat_msg.IUserLoginAck): chat_msg.UserLoginAck;

        /**
         * Encodes the specified UserLoginAck message. Does not implicitly {@link chat_msg.UserLoginAck.verify|verify} messages.
         * @param message UserLoginAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.IUserLoginAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLoginAck message, length delimited. Does not implicitly {@link chat_msg.UserLoginAck.verify|verify} messages.
         * @param message UserLoginAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.IUserLoginAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLoginAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLoginAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.UserLoginAck;

        /**
         * Decodes a UserLoginAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLoginAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.UserLoginAck;

        /**
         * Verifies a UserLoginAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLoginAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLoginAck
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.UserLoginAck;

        /**
         * Creates a plain object from a UserLoginAck message. Also converts values to other types if specified.
         * @param message UserLoginAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.UserLoginAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLoginAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserLoginAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HeartBeatCmd. */
    interface IHeartBeatCmd {

        /** HeartBeatCmd userId */
        userId?: (number|null);
    }

    /** Represents a HeartBeatCmd. */
    class HeartBeatCmd implements IHeartBeatCmd {

        /**
         * Constructs a new HeartBeatCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.IHeartBeatCmd);

        /** HeartBeatCmd userId. */
        public userId: number;

        /**
         * Creates a new HeartBeatCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatCmd instance
         */
        public static create(properties?: chat_msg.IHeartBeatCmd): chat_msg.HeartBeatCmd;

        /**
         * Encodes the specified HeartBeatCmd message. Does not implicitly {@link chat_msg.HeartBeatCmd.verify|verify} messages.
         * @param message HeartBeatCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.IHeartBeatCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartBeatCmd message, length delimited. Does not implicitly {@link chat_msg.HeartBeatCmd.verify|verify} messages.
         * @param message HeartBeatCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.IHeartBeatCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartBeatCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.HeartBeatCmd;

        /**
         * Decodes a HeartBeatCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.HeartBeatCmd;

        /**
         * Verifies a HeartBeatCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartBeatCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartBeatCmd
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.HeartBeatCmd;

        /**
         * Creates a plain object from a HeartBeatCmd message. Also converts values to other types if specified.
         * @param message HeartBeatCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.HeartBeatCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartBeatCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HeartBeatCmd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HeartBeatAck. */
    interface IHeartBeatAck {

        /** HeartBeatAck userId */
        userId?: (number|null);
    }

    /** Represents a HeartBeatAck. */
    class HeartBeatAck implements IHeartBeatAck {

        /**
         * Constructs a new HeartBeatAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.IHeartBeatAck);

        /** HeartBeatAck userId. */
        public userId: number;

        /**
         * Creates a new HeartBeatAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatAck instance
         */
        public static create(properties?: chat_msg.IHeartBeatAck): chat_msg.HeartBeatAck;

        /**
         * Encodes the specified HeartBeatAck message. Does not implicitly {@link chat_msg.HeartBeatAck.verify|verify} messages.
         * @param message HeartBeatAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.IHeartBeatAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartBeatAck message, length delimited. Does not implicitly {@link chat_msg.HeartBeatAck.verify|verify} messages.
         * @param message HeartBeatAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.IHeartBeatAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartBeatAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.HeartBeatAck;

        /**
         * Decodes a HeartBeatAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.HeartBeatAck;

        /**
         * Verifies a HeartBeatAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartBeatAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartBeatAck
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.HeartBeatAck;

        /**
         * Creates a plain object from a HeartBeatAck message. Also converts values to other types if specified.
         * @param message HeartBeatAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.HeartBeatAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartBeatAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HeartBeatAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a JoinRoomCmd. */
    interface IJoinRoomCmd {

        /** JoinRoomCmd userId */
        userId?: (number|null);

        /** JoinRoomCmd roomId */
        roomId?: (number|null);
    }

    /** Represents a JoinRoomCmd. */
    class JoinRoomCmd implements IJoinRoomCmd {

        /**
         * Constructs a new JoinRoomCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.IJoinRoomCmd);

        /** JoinRoomCmd userId. */
        public userId: number;

        /** JoinRoomCmd roomId. */
        public roomId: number;

        /**
         * Creates a new JoinRoomCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomCmd instance
         */
        public static create(properties?: chat_msg.IJoinRoomCmd): chat_msg.JoinRoomCmd;

        /**
         * Encodes the specified JoinRoomCmd message. Does not implicitly {@link chat_msg.JoinRoomCmd.verify|verify} messages.
         * @param message JoinRoomCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.IJoinRoomCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomCmd message, length delimited. Does not implicitly {@link chat_msg.JoinRoomCmd.verify|verify} messages.
         * @param message JoinRoomCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.IJoinRoomCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.JoinRoomCmd;

        /**
         * Decodes a JoinRoomCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.JoinRoomCmd;

        /**
         * Verifies a JoinRoomCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomCmd
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.JoinRoomCmd;

        /**
         * Creates a plain object from a JoinRoomCmd message. Also converts values to other types if specified.
         * @param message JoinRoomCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.JoinRoomCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinRoomCmd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a JoinRoomAck. */
    interface IJoinRoomAck {

        /** JoinRoomAck userId */
        userId?: (number|null);

        /** JoinRoomAck roomId */
        roomId?: (number|null);
    }

    /** Represents a JoinRoomAck. */
    class JoinRoomAck implements IJoinRoomAck {

        /**
         * Constructs a new JoinRoomAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.IJoinRoomAck);

        /** JoinRoomAck userId. */
        public userId: number;

        /** JoinRoomAck roomId. */
        public roomId: number;

        /**
         * Creates a new JoinRoomAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomAck instance
         */
        public static create(properties?: chat_msg.IJoinRoomAck): chat_msg.JoinRoomAck;

        /**
         * Encodes the specified JoinRoomAck message. Does not implicitly {@link chat_msg.JoinRoomAck.verify|verify} messages.
         * @param message JoinRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.IJoinRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomAck message, length delimited. Does not implicitly {@link chat_msg.JoinRoomAck.verify|verify} messages.
         * @param message JoinRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.IJoinRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.JoinRoomAck;

        /**
         * Decodes a JoinRoomAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.JoinRoomAck;

        /**
         * Verifies a JoinRoomAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomAck
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.JoinRoomAck;

        /**
         * Creates a plain object from a JoinRoomAck message. Also converts values to other types if specified.
         * @param message JoinRoomAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.JoinRoomAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinRoomAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateRoomCmd. */
    interface ICreateRoomCmd {

        /** CreateRoomCmd userId */
        userId?: (number|null);

        /** CreateRoomCmd roomNo */
        roomNo?: (string|null);

        /** CreateRoomCmd roomName */
        roomName?: (string|null);
    }

    /** Represents a CreateRoomCmd. */
    class CreateRoomCmd implements ICreateRoomCmd {

        /**
         * Constructs a new CreateRoomCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.ICreateRoomCmd);

        /** CreateRoomCmd userId. */
        public userId: number;

        /** CreateRoomCmd roomNo. */
        public roomNo: string;

        /** CreateRoomCmd roomName. */
        public roomName: string;

        /**
         * Creates a new CreateRoomCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateRoomCmd instance
         */
        public static create(properties?: chat_msg.ICreateRoomCmd): chat_msg.CreateRoomCmd;

        /**
         * Encodes the specified CreateRoomCmd message. Does not implicitly {@link chat_msg.CreateRoomCmd.verify|verify} messages.
         * @param message CreateRoomCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.ICreateRoomCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateRoomCmd message, length delimited. Does not implicitly {@link chat_msg.CreateRoomCmd.verify|verify} messages.
         * @param message CreateRoomCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.ICreateRoomCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateRoomCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateRoomCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.CreateRoomCmd;

        /**
         * Decodes a CreateRoomCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateRoomCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.CreateRoomCmd;

        /**
         * Verifies a CreateRoomCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateRoomCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateRoomCmd
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.CreateRoomCmd;

        /**
         * Creates a plain object from a CreateRoomCmd message. Also converts values to other types if specified.
         * @param message CreateRoomCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.CreateRoomCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateRoomCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateRoomCmd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CreateRoomAck. */
    interface ICreateRoomAck {

        /** CreateRoomAck userId */
        userId?: (number|null);

        /** CreateRoomAck roomId */
        roomId?: (number|null);

        /** CreateRoomAck roomNo */
        roomNo?: (string|null);

        /** CreateRoomAck roomName */
        roomName?: (string|null);
    }

    /** Represents a CreateRoomAck. */
    class CreateRoomAck implements ICreateRoomAck {

        /**
         * Constructs a new CreateRoomAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.ICreateRoomAck);

        /** CreateRoomAck userId. */
        public userId: number;

        /** CreateRoomAck roomId. */
        public roomId: number;

        /** CreateRoomAck roomNo. */
        public roomNo: string;

        /** CreateRoomAck roomName. */
        public roomName: string;

        /**
         * Creates a new CreateRoomAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateRoomAck instance
         */
        public static create(properties?: chat_msg.ICreateRoomAck): chat_msg.CreateRoomAck;

        /**
         * Encodes the specified CreateRoomAck message. Does not implicitly {@link chat_msg.CreateRoomAck.verify|verify} messages.
         * @param message CreateRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.ICreateRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateRoomAck message, length delimited. Does not implicitly {@link chat_msg.CreateRoomAck.verify|verify} messages.
         * @param message CreateRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.ICreateRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateRoomAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.CreateRoomAck;

        /**
         * Decodes a CreateRoomAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.CreateRoomAck;

        /**
         * Verifies a CreateRoomAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateRoomAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateRoomAck
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.CreateRoomAck;

        /**
         * Creates a plain object from a CreateRoomAck message. Also converts values to other types if specified.
         * @param message CreateRoomAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.CreateRoomAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateRoomAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CreateRoomAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LeaveRoomCmd. */
    interface ILeaveRoomCmd {

        /** LeaveRoomCmd userId */
        userId?: (number|null);

        /** LeaveRoomCmd roomId */
        roomId?: (number|null);
    }

    /** Represents a LeaveRoomCmd. */
    class LeaveRoomCmd implements ILeaveRoomCmd {

        /**
         * Constructs a new LeaveRoomCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.ILeaveRoomCmd);

        /** LeaveRoomCmd userId. */
        public userId: number;

        /** LeaveRoomCmd roomId. */
        public roomId: number;

        /**
         * Creates a new LeaveRoomCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoomCmd instance
         */
        public static create(properties?: chat_msg.ILeaveRoomCmd): chat_msg.LeaveRoomCmd;

        /**
         * Encodes the specified LeaveRoomCmd message. Does not implicitly {@link chat_msg.LeaveRoomCmd.verify|verify} messages.
         * @param message LeaveRoomCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.ILeaveRoomCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoomCmd message, length delimited. Does not implicitly {@link chat_msg.LeaveRoomCmd.verify|verify} messages.
         * @param message LeaveRoomCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.ILeaveRoomCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoomCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoomCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.LeaveRoomCmd;

        /**
         * Decodes a LeaveRoomCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoomCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.LeaveRoomCmd;

        /**
         * Verifies a LeaveRoomCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoomCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoomCmd
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.LeaveRoomCmd;

        /**
         * Creates a plain object from a LeaveRoomCmd message. Also converts values to other types if specified.
         * @param message LeaveRoomCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.LeaveRoomCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoomCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LeaveRoomCmd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LeaveRoomAck. */
    interface ILeaveRoomAck {

        /** LeaveRoomAck userId */
        userId?: (number|null);

        /** LeaveRoomAck roomId */
        roomId?: (number|null);
    }

    /** Represents a LeaveRoomAck. */
    class LeaveRoomAck implements ILeaveRoomAck {

        /**
         * Constructs a new LeaveRoomAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.ILeaveRoomAck);

        /** LeaveRoomAck userId. */
        public userId: number;

        /** LeaveRoomAck roomId. */
        public roomId: number;

        /**
         * Creates a new LeaveRoomAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoomAck instance
         */
        public static create(properties?: chat_msg.ILeaveRoomAck): chat_msg.LeaveRoomAck;

        /**
         * Encodes the specified LeaveRoomAck message. Does not implicitly {@link chat_msg.LeaveRoomAck.verify|verify} messages.
         * @param message LeaveRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.ILeaveRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoomAck message, length delimited. Does not implicitly {@link chat_msg.LeaveRoomAck.verify|verify} messages.
         * @param message LeaveRoomAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.ILeaveRoomAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoomAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.LeaveRoomAck;

        /**
         * Decodes a LeaveRoomAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoomAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.LeaveRoomAck;

        /**
         * Verifies a LeaveRoomAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoomAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoomAck
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.LeaveRoomAck;

        /**
         * Creates a plain object from a LeaveRoomAck message. Also converts values to other types if specified.
         * @param message LeaveRoomAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.LeaveRoomAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoomAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LeaveRoomAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SendMsgCmd. */
    interface ISendMsgCmd {

        /** SendMsgCmd userId */
        userId?: (number|null);

        /** SendMsgCmd roomId */
        roomId?: (number|null);

        /** SendMsgCmd msgType */
        msgType?: (chat_msg.MsgType|null);

        /** SendMsgCmd msg */
        msg?: (string|null);
    }

    /** Represents a SendMsgCmd. */
    class SendMsgCmd implements ISendMsgCmd {

        /**
         * Constructs a new SendMsgCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.ISendMsgCmd);

        /** SendMsgCmd userId. */
        public userId: number;

        /** SendMsgCmd roomId. */
        public roomId: number;

        /** SendMsgCmd msgType. */
        public msgType: chat_msg.MsgType;

        /** SendMsgCmd msg. */
        public msg: string;

        /**
         * Creates a new SendMsgCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendMsgCmd instance
         */
        public static create(properties?: chat_msg.ISendMsgCmd): chat_msg.SendMsgCmd;

        /**
         * Encodes the specified SendMsgCmd message. Does not implicitly {@link chat_msg.SendMsgCmd.verify|verify} messages.
         * @param message SendMsgCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.ISendMsgCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendMsgCmd message, length delimited. Does not implicitly {@link chat_msg.SendMsgCmd.verify|verify} messages.
         * @param message SendMsgCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.ISendMsgCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendMsgCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendMsgCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.SendMsgCmd;

        /**
         * Decodes a SendMsgCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendMsgCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.SendMsgCmd;

        /**
         * Verifies a SendMsgCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendMsgCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendMsgCmd
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.SendMsgCmd;

        /**
         * Creates a plain object from a SendMsgCmd message. Also converts values to other types if specified.
         * @param message SendMsgCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.SendMsgCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendMsgCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SendMsgCmd
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SendMsgAck. */
    interface ISendMsgAck {

        /** SendMsgAck userId */
        userId?: (number|null);

        /** SendMsgAck roomId */
        roomId?: (number|null);

        /** SendMsgAck success */
        success?: (boolean|null);
    }

    /** Represents a SendMsgAck. */
    class SendMsgAck implements ISendMsgAck {

        /**
         * Constructs a new SendMsgAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.ISendMsgAck);

        /** SendMsgAck userId. */
        public userId: number;

        /** SendMsgAck roomId. */
        public roomId: number;

        /** SendMsgAck success. */
        public success: boolean;

        /**
         * Creates a new SendMsgAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendMsgAck instance
         */
        public static create(properties?: chat_msg.ISendMsgAck): chat_msg.SendMsgAck;

        /**
         * Encodes the specified SendMsgAck message. Does not implicitly {@link chat_msg.SendMsgAck.verify|verify} messages.
         * @param message SendMsgAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.ISendMsgAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendMsgAck message, length delimited. Does not implicitly {@link chat_msg.SendMsgAck.verify|verify} messages.
         * @param message SendMsgAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.ISendMsgAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendMsgAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendMsgAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.SendMsgAck;

        /**
         * Decodes a SendMsgAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendMsgAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.SendMsgAck;

        /**
         * Verifies a SendMsgAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendMsgAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendMsgAck
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.SendMsgAck;

        /**
         * Creates a plain object from a SendMsgAck message. Also converts values to other types if specified.
         * @param message SendMsgAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.SendMsgAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendMsgAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SendMsgAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** MsgType enum. */
    enum MsgType {
        TEXT = 0,
        IMAGE = 1,
        VOICE = 2,
        VIDEO = 3
    }

    /** Properties of a BroadcastMsgAck. */
    interface IBroadcastMsgAck {

        /** BroadcastMsgAck userId */
        userId?: (number|null);

        /** BroadcastMsgAck roomId */
        roomId?: (number|null);

        /** BroadcastMsgAck msgType */
        msgType?: (chat_msg.MsgType|null);

        /** BroadcastMsgAck msg */
        msg?: (string|null);
    }

    /** Represents a BroadcastMsgAck. */
    class BroadcastMsgAck implements IBroadcastMsgAck {

        /**
         * Constructs a new BroadcastMsgAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat_msg.IBroadcastMsgAck);

        /** BroadcastMsgAck userId. */
        public userId: number;

        /** BroadcastMsgAck roomId. */
        public roomId: number;

        /** BroadcastMsgAck msgType. */
        public msgType: chat_msg.MsgType;

        /** BroadcastMsgAck msg. */
        public msg: string;

        /**
         * Creates a new BroadcastMsgAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadcastMsgAck instance
         */
        public static create(properties?: chat_msg.IBroadcastMsgAck): chat_msg.BroadcastMsgAck;

        /**
         * Encodes the specified BroadcastMsgAck message. Does not implicitly {@link chat_msg.BroadcastMsgAck.verify|verify} messages.
         * @param message BroadcastMsgAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat_msg.IBroadcastMsgAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadcastMsgAck message, length delimited. Does not implicitly {@link chat_msg.BroadcastMsgAck.verify|verify} messages.
         * @param message BroadcastMsgAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat_msg.IBroadcastMsgAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadcastMsgAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadcastMsgAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_msg.BroadcastMsgAck;

        /**
         * Decodes a BroadcastMsgAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadcastMsgAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_msg.BroadcastMsgAck;

        /**
         * Verifies a BroadcastMsgAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadcastMsgAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadcastMsgAck
         */
        public static fromObject(object: { [k: string]: any }): chat_msg.BroadcastMsgAck;

        /**
         * Creates a plain object from a BroadcastMsgAck message. Also converts values to other types if specified.
         * @param message BroadcastMsgAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat_msg.BroadcastMsgAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadcastMsgAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BroadcastMsgAck
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
