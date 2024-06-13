/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-11 11:53:19
 * @LastEditors: zsdddz hitd@foxmail.com
 * @LastEditTime: 2024-06-13 22:33:32
 * @Description: 雪花id生成
 */
export default class CustomSnowflake {
    // 开始时间戳 (2020-01-01)
    private static readonly epoch = 1577836800000n;

    // 每部分所占的位数
    private readonly workerIdBits = 5n;
    private readonly dataCenterIdBits = 5n;
    private readonly sequenceBits = 12n;

    // 支持的最大机器ID和数据中心ID
    private readonly maxWorkerId = -1n ^ (-1n << this.workerIdBits);
    private readonly maxDataCenterId = -1n ^ (-1n << this.dataCenterIdBits);

    // 偏移量
    private readonly workerIdShift = this.sequenceBits;
    private readonly dataCenterIdShift = this.sequenceBits + this.workerIdBits;
    private readonly timestampShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits;

    // 上次生成ID的时间戳
    private lastTimestamp = -1n;
    // 序列号
    private sequence = 0n;

    constructor(private dataCenterId: number = 1, private workerId: number = 1) {
        if (workerId > Number(this.maxWorkerId) || workerId < 0) {
            throw new Error(`Worker ID can't be greater than ${this.maxWorkerId} or less than 0`);
        }
        if (dataCenterId > Number(this.maxDataCenterId) || dataCenterId < 0) {
        throw new Error(`Data center ID can't be greater than ${this.maxDataCenterId} or less than 0`);
        }
    }

    // 生成ID的方法
    public nextId(): string {
        let timestamp = BigInt(this.timeGen());

        if (timestamp < this.lastTimestamp) {
            throw new Error(`Clock moved backwards. Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }

        if (this.lastTimestamp === timestamp) {
            this.sequence = (this.sequence + 1n) & ((1n << this.sequenceBits) - 1n);
            if (this.sequence === 0n) {
                timestamp = this.tillNextMillis(this.lastTimestamp);
            }
        } else {
            this.sequence = 0n;
        }

        this.lastTimestamp = timestamp;

        return (((timestamp - CustomSnowflake.epoch) << this.timestampShift) |
                (BigInt(this.dataCenterId) << this.dataCenterIdShift) |
                (BigInt(this.workerId) << this.workerIdShift) |
                this.sequence).toString();
    }

    private timeGen(): number {
        return Date.now();
 

    }

    private tillNextMillis(lastTimestamp: bigint): bigint {
        let timestamp = BigInt(this.timeGen());
        while (timestamp <= lastTimestamp) {
            timestamp = BigInt(this.timeGen());
        }
        return timestamp;
    }
}