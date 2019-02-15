API Structure

/api/polls 
--
{
  polls : [
    {
      name : String,
      votes : {
        [String] : Number,
        [String] : Number,
        [String] : Number
      }
    },
    {
      name : String,
      votes : {
        [String] : Number,
        [String] : Number
      }
    },
  ]
}