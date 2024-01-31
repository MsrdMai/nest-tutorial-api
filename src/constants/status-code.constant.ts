export interface TransportStatusCode {
  statusCode: string;
  message: string;
}

export const handleStatusCode = (key: any) => {
  let code = '';
  let message = '';

  switch (key) {
    case 200:
      code = '[API200]';
      message = 'สำเร็จ';
      break;
    case 201:
      code = '[API201]';
      message = 'สร้างรายการสำเร็จ';
      break;
    case 400:
      code = '[API400]';
      message = 'คำขอ หรือ parameter ที่ส่งไม่ถูกต้อง';
      break;
    case 401:
      code = '[API401]';
      message = 'กรุณาเข้าสู่ระบบเพื่อใช้งาน';
      break;
    case 403:
      code = '[API403]';
      message =
        'ไม่พบสิทธิการใช้งาน PCF-Transport โปรดติดต่อเจ้าหน้าที่ IT CallCenter';
      break;
    case 404:
      code = '[API404]';
      message = 'ไม่พบข้อมูล หรือส่งข้อมูลเพื่อค้นหาไม่ครบ';
      break;
    case 413:
      code = '[API413]';
      message = 'ไม่สามารถอัพโหลดไฟล์เกิดขนาด 5mb กรุณาตรวจสอบอีกครั้ง';
      break;
    case 422:
      code = '[API422]';
      message = 'ไม่สามารถอัพโหลดไฟล์ได้เนื่องจากประเภทไฟล์ไม่ถูกต้องตามรูปแบบ';
      break;
    case 500:
    default:
      code = '[API500]';
      message = 'พบข้อผิดพลาดจากภายในระบบ กรุณาลองอีกครั้งภายหลัง';
      break;
  }

  return {
    statusCode: code,
    message: message,
  } as TransportStatusCode;
};
