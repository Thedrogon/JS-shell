import readline from "readline";

const builtin = ['echo', 'type', 'exit']

const type = (code) => {
	code = code.join().trim()
	if (builtin.includes(code)) {
		console.log(`${code} is a shell builtin`)
	} else {
		console.log(`${code}: not found`)
	}
}

const echo = (rest) => {
	console.log(rest.join(' '))
}

const exit = (code = 0) => {
	process.exit(Number(code))
}

let buitlinobj = {
	'echo': echo,
	'type': type,
	'exit': exit
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.setPrompt("$ ")

function main() {

	rl.prompt()

	rl.on('line', (line) => {

		line = line.trim();

		let [code, ...rest] = line.split(' ')

		if (typeof buitlinobj[code] == 'function') {
			buitlinobj[code](rest)
		} else {
			console.log(`${line}: command not found`)
		}

		rl.prompt()
	})

	rl.on('close', () => {
		process.exit(0)
	})
}

main()