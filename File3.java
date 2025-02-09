import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Scanner;
class File3{
    public static void main(String a[]) throws IOException{
        Scanner scan=new Scanner(System.in);
        FileInputStream inFile=null;
        FileOutputStream outFile=null;
        try{
            System.out.println("Enter Source file name");
            String inName=scan.nextLine();
            inFile=new FileInputStream(inName);
            System.out.println("Enter Destination file name");
            String outName=scan.nextLine();
            outFile=new FileOutputStream(outName,true);
            fileCopy(inFile,outFile);
            System.out.println("File copied succesfully");
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
    static void fileCopy(FileInputStream infile,FileOutputStream outFile) throws IOException{
        int temp;

        while((temp=infile.read())!=-1){
    
            outFile.write(temp);

        }
    }
}