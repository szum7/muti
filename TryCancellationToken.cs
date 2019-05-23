using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TryThreading
{
	class Program
	{
		static void Main(string[] args)
		{
			CancellationTokenSource tokenSource = new CancellationTokenSource();
            CancellationToken token = tokenSource.Token;

            var task = Task.Factory.StartNew((obj) =>
            {
                while (true)
                {
                    Thread.Sleep(1000);
                    Console.WriteLine("Alive.");

                    try
                    {
                        token.ThrowIfCancellationRequested();
                    }
                    catch (Exception) { }
                }
            }, null, token);

            Thread.Sleep(3000);

            tokenSource.Cancel();

            if (task.IsCanceled) // = false
            {
                Console.WriteLine("Cancelled.");
            }

            Thread.Sleep(3000);

            if (task.IsCanceled) // = false
            {
                Console.WriteLine("Cancelled 2nd.");
            }

            Thread.Sleep(3000);

            Console.WriteLine("Program is terminating.");
		}
	}
}