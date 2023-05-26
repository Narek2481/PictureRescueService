import  bcrypt  from "bcrypt";

const password = "nareknarek1998"
const hashP = await bcrypt.hash(password,3);

const hashHashP = await bcrypt.hash(hashP,3);

const hashFor =  await bcrypt.hash(password,3);

const values = await bcrypt.compare(hashFor,hashHashP);
console.log(values);