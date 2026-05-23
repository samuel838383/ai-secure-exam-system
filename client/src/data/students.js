const students = [

  { name: "Obineni Pravalika", regno: "23JUAI104", class: "III AIML" },

  { name: "Nebinson N", regno: "23JUAI108", class: "III AIML" },

  { name: "Paluri Lakshmi Lavanya", regno: "23JUAI110", class: "III AIML" },

  { name: "Sribharath M R", regno: "23JUAI113", class: "III AIML" },

  { name: "Rahul Sanjay K", regno: "23JUAI114", class: "III AIML" },

  { name: "Sahasra Sree R", regno: "23JUAI115", class: "III AIML" },

  { name: "Shaik Shahabaz", regno: "23JUAI122", class: "III AIML" },

  { name: "Pondhuru Lokesh", regno: "23JUAI123", class: "III AIML" },

  { name: "Selva Prakash R", regno: "23JUAI124", class: "III AIML" },

  { name: "Roshini S", regno: "23JUAI125", class: "III AIML" },

  { name: "Narainsai B", regno: "23JUAI129", class: "III AIML" },

  { name: "Saha Prizen J", regno: "23JUAI133", class: "III AIML" },

  { name: "Subbhiksan R", regno: "23JUAI137", class: "III AIML" },

  { name: "Renu Sanjai K", regno: "23JUAI142", class: "III AIML" },

  { name: "Virshid V", regno: "23JUAI145", class: "III AIML" },

  { name: "Riman Iburahim I", regno: "23JUAI147", class: "III AIML" },

  { name: "Yuvaraj E", regno: "23JUAI151", class: "III AIML" },

  { name: "Nalla Rakesh", regno: "23JUAI154", class: "III AIML" },

  { name: "Pranu Asvanth M", regno: "23JUAI155", class: "III AIML" },

  { name: "Rojith Kumar V", regno: "23JUAI157", class: "III AIML" },

  { name: "Osuri Shiva Rama Raju", regno: "23JUAI158", class: "III AIML" },

  { name: "Nithish Kumar G", regno: "23JUAI162", class: "III AIML" },

  { name: "Shaik Shahana", regno: "23JUAI166", class: "III AIML" },

  { name: "Pammi Dharani Devi", regno: "23JUAI169", class: "III AIML" },

  { name: "Yova Kenson S", regno: "23JUAI170", class: "III AIML" },

  { name: "Nagerla Nuthan Kumar Reddy", regno: "23JUAI171", class: "III AIML" },

  { name: "Somepalli Manoj Kumar", regno: "23JUAI172", class: "III AIML" },

  { name: "Putluru Hari Krishna Reddy", regno: "23JUAI174", class: "III AIML" },

  { name: "Thulava Kavya", regno: "23JUAI176", class: "III AIML" },

  { name: "Tulluru Tejaswi", regno: "23JUAI178", class: "III AIML" },

  { name: "Uppalapati Dheeraj Varma", regno: "23JUAI179", class: "III AIML" },

  { name: "Vadalamanu Uday Bhaskar", regno: "23JUAI183", class: "III AIML" },

  { name: "Yarravarapu Kalyani", regno: "23JUAI186", class: "III AIML" },

  { name: "Sai Kumar Reddy V", regno: "23JUAI188", class: "III AIML" },

  { name: "Shanmukeshwar Reddy P", regno: "23JUAI191", class: "III AIML" },

  { name: "Sudheendra Rao V", regno: "23JUAI192", class: "III AIML" },

  { name: "Shaur David Dev S", regno: "23JUAI196", class: "III AIML" },

  { name: "Sruthi R", regno: "23JUAI202", class: "III AIML" },

  { name: "Sanjay J", regno: "23JUAI203", class: "III AIML" },

  { name: "Sandhiya K", regno: "23JUAI212", class: "III AIML" },

  { name: "Pavan Kumar K", regno: "23JUAI213", class: "III AIML" },

  { name: "Tanniru Sai", regno: "23JUAI214", class: "III AIML" },

  { name: "Poreddy Chandan Kumar R", regno: "23JUAI220", class: "III AIML" },

  { name: "Vinothini S", regno: "23JUAI225", class: "III AIML" },

  { name: "Pranesh S", regno: "23JUAI226", class: "III AIML" },

  { name: "Thrithiya R", regno: "23JUAI227", class: "III AIML" },

  { name: "Nagari Akash Chowdary", regno: "23JUAI233", class: "III AIML" },

  { name: "Samuel Asir Raja S", regno: "23JUAI234", class: "III AIML" },

  { name: "Vinnakota Sravya", regno: "23JUAI239", class: "III AIML" },

  { name: "Upputholla Gayathri", regno: "23JUAI245", class: "III AIML" },

  { name: "Viswanadhapalli Mukesh", regno: "23JUAI246", class: "III AIML" },

  { name: "Yarla Shankara Nagamalli", regno: "23JUAI248", class: "III AIML" },

  { name: "Neelisetty Sumanjali", regno: "23JUAI249", class: "III AIML" },

  { name: "Pepalla Poojitha", regno: "23JUAI250", class: "III AIML" },

  { name: "Suram Preethika", regno: "23JUAI252", class: "III AIML" },

  { name: "Tummala Satish Kumar Reddy", regno: "23JUAI253", class: "III AIML" },

  { name: "Putluru Damodar Reddy", regno: "23JUAI259", class: "III AIML" },

  { name: "Telukutla Venkataravamma", regno: "23JUAI261", class: "III AIML" },

  { name: "Yeluguri Charan Reddy", regno: "23JUAI268", class: "III AIML" },

  { name: "Nuthalapati Venkata Padma", regno: "23JUAI270", class: "III AIML" },

  { name: "Satti Shanmukha Sri Sai", regno: "23JUAI272", class: "III AIML" },

  { name: "Akshay S", regno: "23JUAI274", class: "III AIML" },

  { name: "Ishan Chacko J", regno: "23JUAIM401", class: "III AIML" }

];


export default students;