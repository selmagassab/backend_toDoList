/* This file is for search Patterns exemples that will be used in the whole project , 
define your seach patterns here , export them and then use them in your code , 
to keep it simple and clear
*/

const userNameCin = (search) => {
  const serachPattern = [
    {
      $expr: {
        $regexMatch: {
          input: { $concat: ['$firstName', ' ', '$lastName'] },
          regex: search || '',
          options: 'i',
        },
      },
    },
    {
      $expr: {
        $regexMatch: {
          input: { $convert: { input: '$cin', to: 'string' } },
          regex: search || '',
          options: 'i',
        },
      },
    },
  ];

  return serachPattern;
};

module.exports = {
  userNameCin,
};
