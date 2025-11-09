import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.setPrompt("$ ")

function main() {

	rl.prompt()

	rl.on('line', (line) => {

		if (line === "exit 0"){
			process.exit(0)
		}

		if (line === 'exit 1'){
			process.exit(1)
		}
		console.log(`${line}: command not found`)
		rl.prompt()
	})

	rl.on('close', ()=>{
		process.exit(0)
	})
}

main()