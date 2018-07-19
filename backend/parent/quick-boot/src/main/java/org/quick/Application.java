package org.quick;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;


@EnableTransactionManagement
@MapperScan("org.quick.modules.**.dao")
@SpringBootApplication
public class Application {

    // 创建事务管理器
    @Bean(name = "txManager")
    public PlatformTransactionManager txManager(@Qualifier("dataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }


//    @Value("${mongodb.cluster.nodes}")
//    String mongoNodes;
//
//    @Bean(name = "mongoClient")
//    public MongoClient mongoClient() {
//        List<ServerAddress> seeds = new ArrayList();
//        String[] nodes = mongoNodes.split(",");
//        for (String node : nodes) {
//            String[] hostData = node.split(":");
//            ServerAddress serverAddress;
//            try {
//                serverAddress = new ServerAddress(hostData[0], Integer.valueOf(hostData[1]));
//            } catch (Exception e) {
//                continue;
//            }
//            if (serverAddress != null) {
//                seeds.add(serverAddress);
//            }
//        }
//        MongoClientOptions.Builder options = new MongoClientOptions.Builder();
//        options.writeConcern(WriteConcern.JOURNALED);
//        MongoClientOptions build = options.build();
//        return new MongoClient(seeds, build);
//    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

}
