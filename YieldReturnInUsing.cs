using System;
using System.Collections.Generic;
using System.IO;

namespace Airports.YieldReturnInUsing
{
    class DynamicDataReader
    {
        public IEnumerable<string> ReadFromFile(string path)
        {
            string line;
            using (StreamReader file = new StreamReader(path))
            {
                while ((line = file.ReadLine()) != null)
                {
                    yield return line;
                }
            }
        }

        public IEnumerable<string> ReadFromCollection()
        {
            IEnumerable<string> ret = new List<string>()
            {
                "id,airline,departureAirport,arrivalAirport",
                "0,1,1,1055",
                "1,1,1,1075",
                "2,1,1,1230",
                // ...
            };

            foreach (string item in ret)
            {
                yield return item;
            }
        }

        public void MainMethod(IEnumerable<string> collection)
        {
            foreach (string line in collection) 
            {
				// current ReadFrom method with 'yield return' remains "open", program control is here -> then at yield return -> then here -> ... -> end of yield return
				// Resource in using block is not disposed until all yields return (?)
                Console.WriteLine(line);
            }
        }

        public DynamicDataReader()
        {
            // BEGIN Program

            Console.WriteLine("File:");
            IEnumerable<string> file = ReadFromFile("Resources/segments.dat");
            MainMethod(file);

            Console.WriteLine("\n\n Collection:");
            IEnumerable<string> collection = ReadFromCollection();
            MainMethod(collection);

            // END Program
        }
    }
}
