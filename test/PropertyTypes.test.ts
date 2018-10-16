import { resolve } from 'path';
import moment from 'moment';
import { Entity, Column } from '../dist';
import config from './config';


describe("PropertyTypes", () => {

  const enumData = [
    "郭襄",
    "王勃",
    "杜牧",
    "李恪",
    "段毓",
    "蒙毅",
    "季梦",
    "冉舒",
    "朱穆",
    "车畅"
  ];

  @Entity(1)
  class TestEntity {
    @Column({ type: 'bool' })
    testBool: boolean;
    @Column({ type: 'bool', value: true })
    testBool2: boolean;
    @Column({ type: 'date' })
    testDate1: Date;
    @Column({ type: 'date', start: '2015-01-01' })
    testDate2: Date;
    @Column({ type: 'date', end: '2018-01-01' })
    testDate3: Date;
    @Column({ type: 'date', start: '2018-01-01', end: '2018-01-02' })
    testDate4: Date;
    @Column({ type: 'date', display: 'timestamp' })
    testDate5: number;
    @Column({ type: 'date', display: 'string', format: 'MM/DD/YYYY' })
    testDate6: string;
    @Column({ type: 'decimal', limit: [-100, 100], precition: 6 })
    testDecimal: number;
    @Column({ type: 'enum', target: enumData})
    testEnum1: string;
    @Column({ type: 'enum', target: './models/name.json' })
    testEnum2: string;
    @Column({ type: 'integer', limit: [-100, 100] })
    testInteger: number;
    @Column({ type: 'string', limit: [6, 20] })
    testString: string;
  }

  const testEntity = new TestEntity(config, resolve(__dirname, './TestEntity'));
  console.log(testEntity);

  describe("Bool", () => {
    test("should set bool value correct", () => {
      expect(typeof testEntity.testBool).toBe('boolean');
      expect(testEntity.testBool2).toBe(true);
    });
  })
  describe("Date", () => {
    // format: string;
    // start?: string;
    // end?: string;
    // display?: DateDisplayType;
    test("should set random timestamp", () => {
      expect(testEntity.testDate1).not.toBeNaN();
      expect(moment(testEntity.testDate1).isValid()).toBe(true);
    })
    test("should set random timestamp greater than start", () => {
      expect(moment(testEntity.testDate2).isSameOrAfter(moment(new Date('2015-01-01T00:00:00.000Z')))).toBe(true)
    })
    test("should set random timestamp less than end", () => {
      expect(moment(testEntity.testDate3).isSameOrBefore(moment(new Date('2015-01-01T00:00:00.000Z')))).toBe(true)
    })
    test("should set random timestamp between start and end", () => {
      expect(moment(testEntity.testDate4).isSameOrAfter(moment(new Date('2018-01-01T00:00:00.000Z')))).toBe(true)
      expect(moment(testEntity.testDate4).isBefore(moment(new Date('2018-01-02T00:00:00.000Z')))).toBe(true)
    })
    test("should set random date format by display(string | timestamp | date)", () => {
      expect(testEntity.testDate1 instanceof Date).toBe(true);
      expect(typeof testEntity.testDate5).toBe('number');
      expect(typeof testEntity.testDate6).toBe('string');
      expect(moment(testEntity.testDate6, 'MM/DD/YYYY').isValid()).toBe(true);
    })
  });
  describe("Decimal", () => {
    // limit: [number, number];
    // precition: number;
    test("should set random decimal between limit", () => {
      expect(testEntity.testDecimal).toBeGreaterThanOrEqual(-100);
      expect(testEntity.testDecimal).toBeLessThan(100);
    })
  });
  describe("Enum", () => {
    // target: string | any[];
    test("should set one of value in target", () => {
      expect(enumData.indexOf(testEntity.testEnum1)).toBeGreaterThanOrEqual(0);
      expect(enumData.indexOf(testEntity.testEnum2)).toBeGreaterThanOrEqual(0);
    })
  });
  describe("Integer", () => {
    // limit: [number, number];
    test("should set random integer between limit", () => {
      expect(testEntity.testInteger).toBeGreaterThanOrEqual(-100);
      expect(testEntity.testInteger).toBeLessThan(100);
    });
  });
  describe("String", () => {
    // limit: [number, number];
    test("should set random string that length between limit", () => {
      expect(testEntity.testString.length).toBeGreaterThanOrEqual(6);
      expect(testEntity.testString.length).toBeLessThan(20);
    });
  });
});
