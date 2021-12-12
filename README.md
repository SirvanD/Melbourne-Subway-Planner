# Melbourne-Subway-Planner
- Utilising vanilla JavaScript, HTML and CSS, asking for 2 user inputs of origin and destination stops, this code will return the efficient travel path using DOM methods.
- Given 3 different arrays of station lines, the code will loop through each array to find origin stop then repeating the same process for destination stop it will offer the best path to reach the target stop.
- Given an intersection in which lines will cross, the program will traverse straight or in a reverse order depending on the target stop placement. 

All 3 train lines intersect at **Richmond**, but there are NO other intersection points as trains run express.

```
                           Flinders Street - Richmond - East Richmond - Burnley - Hawthorn - Glenferrie
                                                ||
Flagstaff - Melbourne Central - Parliament - Richmond - Kooyong - Tooronga
                                                ||
                            Southern Cross - Richmond - South Yarra - Prahran - Windsor
```


example: 
```
origin: Melbourne Central
destination: Windsor

Melbourne Central -----> Parliament -----> Richmond 
                                              ||
                                           Richmond -----> South Yarra -----> Prahran -----> Windsor
                                           
5 stops total              
