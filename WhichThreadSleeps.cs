using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace TryThreading
{
    class Program
    {
        static Random rnd = new Random();

        static async void Sout1()
        {
            int wait = rnd.Next(1000, 10000);
            await Task.Delay(wait);
            Console.WriteLine($"SOUT 1 finished with {wait} ms.");
        }

        static async void Sout2()
        {
            int wait = rnd.Next(1000, 10000);
            await Task.Delay(wait);
            Console.WriteLine($"SOUT 2 finished with {wait} ms.");
        }

        static async void Sout3()
        {
            int wait = rnd.Next(1000, 10000);
            await Task.Delay(wait);
            Console.WriteLine($"SOUT 3 finished with {wait} ms.");
        }

        static void Main(string[] args)
        {
            Sout1();
            Sout2();
            Sout3();

            Thread.Sleep(6000);
            Console.WriteLine("Done sleeping.");

            // Which thread sleeps? Could a Sout use the same 
            // thread as the main program, thus getting stuck 
            // with the same Thread.Sleep?

            // END
            Console.WriteLine("\n\nEND");
        }
    }
}