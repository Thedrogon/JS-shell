import readline from "readline";
import fs from 'fs'
import path from "path";

const builtin = ['echo', 'type', 'exit']

const type = (code) => {
	code = code.join().trim()
	if (builtin.includes(code)) {
		console.log(`${code} is a shell builtin`)
	} else {
		const PATH = process.env.PATH || ""
		const sep = process.platform === 'win32' ? ';' : ':'
		const path_dir = PATH.split(sep).filter(Boolean);

		const winExts = process.platform === "win32"
			? (process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM")
				.toLowerCase()
				.split(";")
			: [];


		for (const dir of path_dir) {
			const basePath = path.join(dir, code);


			//not windows
			if (process.platform !== "win32") {
				if (fs.existsSync(basePath)) {
					const st = fs.statSync(basePath);
					const canExec = (st.mode & 0o111) !== 0 && st.isFile();
					if (canExec) {
						console.log(`${code} is ${basePath}`);
						return;
					}
				}
			}

			if (process.platform === "win32") {
				for (const ext of winExts) {
					const file = basePath + ext;
					if (fs.existsSync(file) && fs.statSync(file).isFile()) {
						console.log(`${code} is ${file}`);
						return;
					}
				}
			}
		}
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