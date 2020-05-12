import { calculateDuration } from "../client/js/app";


let Date_Start = new Date('2020-05-10');
let Date_End = new Date('2020-05-12');


test('duration between 05-10-2020 , 05-12-2020 to equal 2', () => {
	console.log((Date_End - Date_Start)/ (1000 * 3600 * 24));
  expect(calculateDuration (Date_Start , Date_End )).toEqual(2);
});
  
