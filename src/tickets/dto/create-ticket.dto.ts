import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty({ message: '수령자 이름을 입력해주세요.' })
  receiverName: string;

  @IsString()
  @IsNotEmpty({ message: '수령자 전화번호를 입력해주세요.' })
  receiverPhoneNumber: string;

  @IsString()
  @IsNotEmpty({ message: '수령자 주소를 입력해주세요.' })
  receiverAddress: string;
}
