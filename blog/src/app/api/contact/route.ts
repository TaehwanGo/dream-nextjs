import { sendEmail } from "@/service/email";
import * as yup from "yup";

// 데이터 규격(스키마) 정의
const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(request: Request) {
  // console.log("request.body", request.body);
  const body = await request.json();
  if (!bodySchema.isValidSync(body)) {
    return new Response(
      JSON.stringify({
        message: "유효하지 않은 포맷입니다.", // body.message로 메시지를 보내는 것이 어느정도 암묵적인 약속
      }),
      {
        status: 400,
      }
    );
  }

  // 노드메일러를 사용하여 이메일 전송

  return sendEmail(body) //
    .then(() => {
      return new Response(
        JSON.stringify({
          message: "이메일이 성공적으로 전송되었습니다.",
        }),
        {
          status: 200,
        }
      );
    })
    .catch((error) => {
      return new Response(
        JSON.stringify({
          message: "메일 전송에 실패했습니다.",
        }),
        {
          status: 500,
        }
      );
    });
}
