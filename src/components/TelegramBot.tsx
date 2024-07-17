import { SubmitHandler, useForm } from "react-hook-form";
// import scss from "./TelegramBot.modyle.scss";
import axios from "axios";
const token = import.meta.env.VITE_TELEGRAM_TOKEN;
const chatId = import.meta.env.VITE__TTELEGRSM_CHAT_ID;

interface IFormTelegram {
  userName: string;
  message: string;
}

const TelegramBot = () => {
  const { register, handleSubmit } = useForm<IFormTelegram>();

  const messageModel = (data: IFormTelegram) => {
    let messageTG = `userName:<b>${data.userName}</b>\n`;
    messageTG += `message:<b>${data.message}</b>`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      parse_mode: "html",
      text: messageModel(data),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userName")} placeholder="ваше имя" />
        <input {...register("message")} placeholder="Введите сообщение" />
        <button type="submit">Отправить</button>
      </form>
    </>
  );
};

export default TelegramBot;
