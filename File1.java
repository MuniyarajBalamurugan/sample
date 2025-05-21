import java.util.*;
import java.io.*;
import java.text.SimpleDateFormat;

class File1{
    public static void main(String[] args) {
        Scanner scan=new Scanner(System.in);
        int op;
        do{
        System.out.println("MENU");
        System.out.println("1.Create a File \n2.Get file information\n3.Delete a file\n4.Exit\nEnter an option:");
        op=scan.nextInt();
        switch(op){
            case 1:{    
                fileCreation(scan);
                break;
            }
            case 2:{
                getFileInfo(scan);
                break;
            }
            case 3:{
                deleteAFile(scan);
                break;
            }
        }
    }while(op<=3);
    }
    static void fileCreation(Scanner scan){
        scan.nextLine();
        System.out.println("Enter file name:");
        String name=scan.nextLine();
        try{
            File obj=new File(name);
            boolean isCreated=obj.createNewFile();
            if(isCreated)
            System.out.println("File created scuccesfully");
            else
                System.out.println("The file is already exist");
        }
        catch(IOException e){
            System.out.println(e.getMessage());
        }
        finally{
            
        }
    
    }
    static void getFileInfo(Scanner scan){
        scan.nextLine();
        System.out.println("Enter file name to get its information");
        String fileName=scan.nextLine();
        File file=new File(fileName);
        boolean isExist=file.exists();
        if(isExist){
            System.out.println("The file name is :"+file.getName());
            System.out.println("Absoluter pathof the file"+file.getAbsolutePath());
            System.out.println("File size:"+file.length()+"Bytes");
            System.out.println("Last modified on "+getLastModifiedDate(file));
            
            boolean canWrite=file.canWrite();
            boolean canRead=file.canRead();
            if(canWrite || canRead){
                if(canRead && canWrite){
                    System.out.println("File is readable and writale");
                }
                if(canRead && !canWrite){
                    System.out.println("File is Readable and not writable");
                }
                if(!canRead && canWrite){
                    System.out.println("File is Writable and not Readable");
                }
            }
            
        }
        else{
            System.out.println("The file is not exist");
        }
    }
    static String getLastModifiedDate(File file)
    {
        SimpleDateFormat df=new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String date=df.format(new Date(file.lastModified()));
        return date;
    }
    static void deleteAFile(Scanner scan)    {
        scan.nextLine();
        System.out.println("Enter filename to delete:");
        String fName=scan.nextLine();
        File file=new File(fName);
        
        if(file.exists()){
            boolean  isDeleted=file.delete();
            if(isDeleted)
                System.out.println("File is deleted");
            else
                System.out.println("The file is not");
                System.out.println("The file is not");
                System.out.println("The file is not");

                System.out.println("The file is not");
            
        }
        
    }
}