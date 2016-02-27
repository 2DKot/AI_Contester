
package com.belocraft;

import java.awt.*;
/**
 *
 * @author Eugene
 */
public class MainTest extends junit.framework.TestCase {
	
		private Main main;
		
		public void setUp(){
			this.main = new Main();
		}
		
		public void test_Sum_positive()
		{
			int answer = main.Sum(5,6);			
			assertEquals(11,answer);			
		}
		
		public void test_Sum_negative()
		{
			int answer = main.Sum(-5,6);			
			assertEquals(1,answer);			
		}
		
		public void test_Sum_both_negative()
		{
			int answer = main.Sum(-5,-6);			
			assertEquals(-11,answer);			
		}
		
		public void test_Sum_other_numbers()
		{
			int answer = main.Sum(45,67);			
			assertEquals(112,answer);			
		}
}
