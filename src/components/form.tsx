import { LoaderCircle } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import z from "zod";
import SendIcon from "../assets/icons/send.svg?react";
import { useEmail } from "../hooks/use-email";
import Icon from "./icon";
import InputBox from "./input-box";
import Text from "./text";

const emailDataSchema = z.object({
	name: z.string().max(30),
	email: z.email(),
	subject: z.string().max(50),
	message: z.string().max(250),
});

type EmailDataType = z.infer<typeof emailDataSchema>;

const emailMock = {
	name: "",
	email: "",
	subject: "",
	message: "",
};

export default function Form() {
	const { mutateAsync: sendEmail, isPending, isError, isSuccess } = useEmail();
	const [email, setEmail] = useState<EmailDataType>(emailMock);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setEmail((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const response = await sendEmail(email);

		if (isError) alert("Erro ao enviar o email");

		if (isSuccess) alert(response.ok);

		setEmail(emailMock);
	}

	return (
		<form
			onSubmit={handleSubmitForm}
			className="bg-cinza-400 border border-azul space-y-6.25 py-6 px-5 rounded-5 h-fit lg:min-w-[700px]"
		>
			<Text as="h1" variant="anony-md" bold className="mb-6.25" trace>
				Lets build something together!
			</Text>

			<div className="flex flex-col md:flex-row items-center gap-5">
				<InputBox
					id="Name"
					name="name"
					value={email.name}
					onChange={handleChange}
					placeholder="Your Name"
					className="w-full"
					required
				/>
				<InputBox
					type="email"
					id="Email"
					name="email"
					value={email.email}
					onChange={handleChange}
					placeholder="Your email address"
					className="w-full"
					required
				/>
			</div>
			<InputBox
				id="Subject"
				name="subject"
				value={email.subject}
				onChange={handleChange}
				placeholder="Subject of your message"
				required
			/>
			<InputBox
				as="textarea"
				id="Message"
				name="message"
				value={email.message}
				onChange={handleChange}
				placeholder="What I can help you with?"
				required
			/>

			<button
				type="submit"
				className="flex items-center justify-center gap-3 bg-azul w-full p-5 rounded-5"
			>
				{!isPending && (
					<>
						{" "}
						<Icon svg={SendIcon} />
						<Text variant="anony-sm" bold>
							Send Message
						</Text>
					</>
				)}

				{isPending && <LoaderCircle className="animate-spin" color="white" />}
			</button>
		</form>
	);
}
