import React, { useState } from "react";
import Head from "next/head";
import { FiCopy } from "react-icons/fi";
import {
	InputGroup,
	Input,
	Stack,
	Container,
	Flex,
	FormControl,
	Button,
	Box,
	Text,
	Checkbox,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Heading,
	Tooltip,
	useToast,
	IconButton,
} from "@chakra-ui/react";

import { generatePassword } from "../utils";
import { GeneratePassowrdOptions } from "../utils/generatePassword";

function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text);
}

const Home = () => {
	const [password, setPassword] = useState("");
	const [length, setLength] = useState(8);
	const [options, setOptions] = useState<GeneratePassowrdOptions>({
		numbers: true,
		lowercase: true,
		uppercase: true,
		special_characters: true,
		spaces: false,
	});
	const toast = useToast();

	const selectedOptions = Object.entries(options).filter((option) => option[1] === true);

	// const checkedOptions = selectedOptions.map((option) => option[0]);

	const spacesIsOnlySelectedOption = selectedOptions.length === 1 && selectedOptions[0][0] === "spaces";

	const handleUpdateOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
		const option = e.target.value as keyof GeneratePassowrdOptions;
		setOptions((previousOptions) => ({ ...previousOptions, [option]: !options[option] }));
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleChangeLength = (value: number) => {
		setLength(value);
		setPassword(generatePassword(length, options));
	};

	const handleShowToast = () => {
		copyToClipboard(password);
		toast({
			title: "Whoo hoo!",
			description: "Successfully copied password to clipboard",
			status: "success",
			duration: 1500,
			isClosable: true,
			position: "top",
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPassword(generatePassword(length, options));
	};

	return (
		<Flex as="div" className="app">
			<Head>
				<title>Password Generator</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</Head>

			<Flex direction="column" justify="space-between" height="100vh" width="100%" my={12}>
				<Container as="section" width="100%" maxW={450} px={8} py={12} boxShadow="xl" p="6" rounded="lg">
					<Flex as="main">
						<form onSubmit={handleSubmit} style={{ width: "100%" }}>
							<Stack spacing={4}>
								<Heading
									as="h1"
									size="3xl"
									textAlign="center"
									bgGradient="linear(to-l, #7928CA, #FF0080)"
									bgClip="text"
									fontWeight="extrabold"
									lineHeight="0.9"
								>
									PassGen
								</Heading>

								<FormControl id="password">
									<InputGroup size="lg">
										<Input placeholder="L^!:>pQ@" value={password} onChange={handleChangePassword} isReadOnly />
										<Tooltip label="Copy password" fontSize="md" placement="bottom" hasArrow>
											<IconButton
												colorScheme="blue"
												aria-label="Search database"
												size="lg"
												icon={<FiCopy />}
												onClick={handleShowToast}
											/>
										</Tooltip>
									</InputGroup>
								</FormControl>

								<Stack mb={4}>
									<Checkbox value="lowercase" defaultChecked={options.lowercase} onChange={handleUpdateOptions}>
										Lowercase
									</Checkbox>
									<Checkbox value="uppercase" defaultChecked={options.uppercase} onChange={handleUpdateOptions}>
										Uppercase
									</Checkbox>
									<Checkbox value="numbers" defaultChecked={options.numbers} onChange={handleUpdateOptions}>
										Numbers
									</Checkbox>
									<Checkbox
										value="special_characters"
										defaultChecked={options.special_characters}
										onChange={handleUpdateOptions}
									>
										Special characters
									</Checkbox>
									<Checkbox value="spaces" defaultChecked={options.spaces} onChange={handleUpdateOptions}>
										{spacesIsOnlySelectedOption ? (
											<Tooltip label="Letters will be added if this is the only option selected" aria-label="A tooltip">
												Spaces
											</Tooltip>
										) : (
											"Spaces"
										)}
									</Checkbox>
								</Stack>
								<Text>Length</Text>
								<Slider
									aria-label="slider-length"
									defaultValue={16}
									min={8}
									max={64}
									step={1}
									onChange={(value) => handleChangeLength(value)}
								>
									<SliderTrack bg="gray.100">
										<Box position="relative" right={10} />
										<SliderFilledTrack bg="blue.500" />
									</SliderTrack>
									<SliderThumb boxSize={6} style={{ color: "#000" }}>
										{length}
									</SliderThumb>
								</Slider>

								<Button size="lg" colorScheme="blue" variant="solid" type="submit">
									Generate
								</Button>
							</Stack>
						</form>
					</Flex>
				</Container>
			</Flex>
		</Flex>
	);
};

export default Home;
