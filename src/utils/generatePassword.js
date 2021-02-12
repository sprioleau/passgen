export const generatePassword = (length, options) => {
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const upppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = "0123456789";
	const specialCharacters = `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`;
	const space = ` `;
	const allCharacters = lowercase + upppercase + numbers + specialCharacters;

	let characters = "";
	if (options["numbers"]) characters += numbers;
	if (options["special-characters"]) characters += specialCharacters;
	if (options["mixed-case"]) characters += upppercase + lowercase;
	if (options["spaces"]) characters += space + lowercase;
	if (characters.length === 0) characters = allCharacters;

	let password = "";
	for (var i = 0, n = characters.length; i < length; ++i) {
		password += characters.charAt(Math.floor(Math.random() * n));
	}
	return password;
};
