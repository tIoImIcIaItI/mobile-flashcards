class Assert {
	static notEmpty = (name, value) => {
		if (!value || !value.length) throw new Error(`${name} must be non-empty`); }
	
	static notNothing = (name, value) => {
		if (!value) throw new Error(`${name} must be something`); }
}

export default Assert;
