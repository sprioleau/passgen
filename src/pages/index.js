import { useState } from "react";
import Head from "next/head";
import useClipboard from "react-use-clipboard";
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
	CheckboxGroup,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Heading,
	Tooltip,
	useToast,
	IconButton,
} from "@chakra-ui/react";

import { generatePassword } from "../utils/generatePassword";

const Home = () => {
	const [password, setPassword] = useState("");
	const [length, setLength] = useState(8);
	const [options, setOptions] = useState({
		numbers: true,
		"mixed-case": true,
		"special-characters": true,
		spaces: false,
	});
	const toast = useToast();
	const [isCopied, setCopied] = useClipboard(password, {
		successDuration: 1500,
	});

	// const checkedOptions = Object.entries(options)
	// 	.filter((option) => option[1] === true)
	// 	.map((option) => option[0]);

	const handleUpdateOptions = (e) => {
		const option = e.target.value;
		setOptions({ ...options, [option]: !options[option] });
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleChangeLength = (value) => {
		setLength(value);
	};

	const handleShowToast = () => {
		setCopied();
		toast({
			title: "Whoo hoo!",
			description: "Successfully copied password to clipboard",
			status: "success",
			duration: 1500,
			isClosable: true,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPassword(generatePassword(length, options));
	};

	return (
		<Flex as="div" className="app">
			<Head>
				<title>Create Next App</title>
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
				<Container as="section" width="100%" maxW={600} px={8} py={12} boxShadow="xl" p="6" rounded="lg">
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
									<Checkbox value="numbers" defaultChecked={options["numbers"]} onChange={handleUpdateOptions}>
										Numbers
									</Checkbox>
									<Checkbox value="mixed-case" defaultChecked={options["mixed-case"]} onChange={handleUpdateOptions}>
										Mixed case
									</Checkbox>
									<Checkbox
										value="special-characters"
										defaultChecked={options["special-characters"]}
										onChange={handleUpdateOptions}
									>
										Special characters
									</Checkbox>
									<Checkbox value="spaces" defaultChecked={options["spaces"]} onChange={handleUpdateOptions}>
										Spaces
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
