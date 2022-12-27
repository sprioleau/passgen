export type GeneratePassowrdOptions = {
	lowercase: boolean;
	uppercase: boolean;
	numbers: boolean;
	special_characters: boolean;
	spaces: boolean;
};

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const upppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialCharacters = `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`;
const space = `        `;
const allCharacters = lowercase + upppercase + numbers + specialCharacters;

export default function generatePassword(length: number, options: GeneratePassowrdOptions) {
	let characters = "";
	if (options.lowercase) characters += lowercase;
	if (options.uppercase) characters += upppercase;
	if (options.numbers) characters += numbers;
	if (options.special_characters) characters += specialCharacters;
	if (options.spaces) characters += space;
	if (characters.length === 0) characters = allCharacters;

	let password = "";
	for (var i = 0, n = characters.length; i < length; ++i) {
		password += characters.charAt(Math.floor(Math.random() * n));
	}
	return password;
}
