import { useMutation } from "@tanstack/react-query";
import z from "zod";

const emailDataSchema = z.object({
	name: z.string().max(30),
	email: z.email(),
	subject: z.string().max(50),
	message: z.string().max(250),
});

type EmailDataType = z.infer<typeof emailDataSchema>;

export const useEmail = () => {
	const mutation = useMutation({
		mutationKey: ["email"],
		mutationFn: async (emailData: EmailDataType) => {
			const response = await fetch(
				`https://api-projects-n962.onrender.com/email`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(emailData),
				},
			);

			if (!response.ok) {
				return new Error("Failed to send email");
			}

			return response.json();
		},
	});
	return mutation;
};
