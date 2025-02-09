import java.util.*;
import java.io.*;
class File2{
    public static void main(String a[]) throws IOException{
        Scanner scan=new Scanner(System.in);

        FileWriter outFile=null;
        FileReader inFile=null;;
        CharacterCount obj=new CharacterCount();
        System.out.println("Enter file name:");
        String name=scan.nextLine();
        try{
            inFile=new FileReader(name);
            outFile=new FileWriter("output.txt");
         boolean isDone=obj.charCountFromFile(inFile);
         if(isDone)
            obj.resultToFile(outFile);
        else
            System.out.println("The given file is empty");
        }
        catch(IOException e){
            System.out.println(e.getMessage());
        }
        finally{
            inFile.close();
            outFile.close();
            scan.close();
        }
       
    }
}
class CharacterCount{
    private int vowels,consonants,whiteSpace,specialCharacter,digit; 
    boolean charCountFromFile(FileReader inFile) throws IOException
    {
        boolean isReady=inFile.ready();
        String regex="[^a-zA-Z0-9]";
        if(isReady){
            while(inFile.ready()){
                int nums=inFile.read();
                if(Character.isWhitespace(nums)){
                    whiteSpace++;
                    continue;
                }
                if(Character.isDigit(nums)){
                    digit++;
                    continue;
                }
                if(String.valueOf((char)nums).matches(regex)){
                    specialCharacter++;
                    continue;
                }
                if(Character.isLetter(nums))
                {
                    
                    char  ch=Character.toLowerCase((char)nums);
                    if(ch=='a' || ch =='e' || ch=='i' || ch=='o' || ch=='u')
                        vowels++;
                    else 
                        consonants++;
                }
                
            }
            return true;
        }
        else
             return false;
    }
    void resultToFile(FileWriter file) throws IOException{
        file.write("****************************************");

        file.write("\nNo of Vowels           :"+vowels);
        file.write("\nNo of consonants       :"+consonants);
        file.write("\nNo of digits           :"+digit);
        file.write("\nNo of special character:"+specialCharacter);
        file.write("\nNo of  White spaces    :"+whiteSpace);
        file.write("\n****************************************");

    }
}