/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'

export const title = 'Northwind Graph'
export const category = 'graphExamples'
export const description = 'Northwind graph tutorial!!'
export const slides = [
    <div className="row content-row">
        <div className="col-sm-3">
            <h3>Northwind Graph</h3>
            <p className="lead">AgensGraph Tutorial: Import, Query, and Modify Graph Data </p>
        </div>
        <div className="col-sm-9">
            <h4>Before Getting Started!</h4>
            <p>본 튜토리얼은 사용자들이 AgensGraph에 샘플 데이터를 적재하고 적재된 데이터를 조회하거나 원하는 정보를 추출하는 과정을 따라할 수 있도록 안내하기 위해 제작되었습니다.</p>
            <p>본 튜토리얼을 따라 데이터를 적재하고 활용하시려면 반드시 AgensGraph를 먼저 설치하셔야 하며 시각화 도구인 OpenBrowser 함께 설치해 사용하신다면 더 쉽고 빠르게 샘플 데이터를 이해하고 분석하실 수 있습니다.</p>
            <p>AgensGraph에 데이터를 적재하는 방법은 크게 2가지가 존재합니다.</p>
            <ol className="big">
                <li>데이터셋 파일을 AgensGraph로 Import</li>
                <li>AgensGraph 상에서 쿼리를 실행해 데이터를 생성</li>
            </ol>
            <p>이 튜토리얼에서는 데이터셋 파일(CSV)을 AgensGraph로 Import하는 방법을 설명할 것이며, 쿼리로 데이터를 생성하는 방법이 궁금하시다면 Bitnine 홈페이지를 방문해
            <a target="_blank" rel="noopener noreferrer" href="http://bitnine.net/learn/"> Basic Cypher & Advanced Cypher</a>백서를 참조하시기 바랍니다.
            본 튜토리얼은 AgensGraph의 데이터 생성, 읽기, 업데이트, 삭제(CRUD) 결과를 시각화 도구인 OpenBrowser를 통해 안내합니다.
            또한 본 튜토리얼에서 안내하는 제품 일부 기능은 오직 AgensGraph Enterprise Edition에서만 제공됩니다.
            Enterprise 제품에 관한 자세한 사항은 Bitnine 홈페이지를 참조하시기 바랍니다.</p>
        </div>
    </div>,
    <div className="row content-row" key="s2">
        <div className="col-sm-3">
            <h3>Dataset Overview: Northwind</h3>
            <p>
                본 튜토리얼에서는 RDBMS에서 널리 사용되는 샘플 데이터셋인 Northwind 데이터셋을 사용합니다.
            </p>
            <hr />
            <p>
                <small>:help</small> <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>cypher</a>
                <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>MATCH</a>
            </p>
        </div>
        <div className="col-sm-9">
            <h4>Load records</h4>
            <p>
                Northwind 데이터셋은 흔히 관계형 데이터 예제로 사용되지만 그래프 데이터 예제로도 사용할 수 있습니다. Northwind 데이터셋에는 전세계에서 특수 식품을 수입, 수출하는 Northwind Traders라는 가상의 회사가 존재하며 이 회사의 판매 데이터가 들어 있습니다. 본 튜토리얼에서 제공하는 Northwind 데이터셋은 총 11개 테이블, Vertex Label 6개, Edge Label 6개로 구성되어 있으며 고객 91명, 주문이력 830회, 판매된 상품 77가지를 포함하고 있습니다.
            </p>
            <p>
                데이터셋의 Entity-Relationship Diagram은 아래와 같습니다.
            <img
                    src="resources/images/northwind/Entity-Relationship-Diagram.png"
                    className="img-responsive"
                    alt="Entity-Relationship-Diagram"
                />
            </p>
        </div>
    </div>,
    <div className="row content-row" key="s3">
        <div className="col-sm-3">
            <h3>What is, and How to Generate Graph Model</h3>
            <p>
                그래프 모델(Graph Model)은 데이터를 Row와 Column으로 구성된 테이블(Table)이 아니라, 점(Node 또는 Vertex)과 점이 선(Link 또는 Edge)로 연결된 형태인 그래프로 구현한 데이터 모델입니다.
            </p>
            <hr />
            <p>
                <small>:help</small> <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>cypher</a>
                <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>MATCH</a>
            </p>
        </div>
        <div className="col-sm-9">
            <h4>Graph Modeling</h4>
            <p>
                테이블을 사용하는 관계형 모델에서 그래프 모델로 전환 시 다음 내용을 참고하십시오.
            </p>
            <ol className="big">
                <li>관계형 모델에서 Row는 그래프 모델에서 Properties를 가진 Vertex 또는 Edge에 해당</li>
                <li>관계형 모델에서 테이블명(Table Name)은 그래프 모델에서 Vertex Label과 Edge Label에 해당</li>
            </ol>
            <p>
                Northwind 데이터셋의 그래프 모델은 다음과 같습니다.
                <img
                    src="resources/images/northwind/Graphmodel.png"
                    className="img-responsive"
                    alt="Graphmodel"
                />
            </p>
            <p>그래프 모델과 관계형 모델의 가장 큰 차이 중 하나는 그래프 모델이 관계형 모델과 다르게 현실 모델(비즈니스 모델)을 있는 그대로 반영한다는 점입니다. </p>
            <p>관계형 모델은 복잡한 현실 세계의 비즈니스 모델을 가공해 표 형태의 테이블 형식으로 변환합니다. </p>
            <p>하지만 현실 세계의 비즈니스 모델은 각 객체(Vertex)간에 관계(Edge)가 맺어진 형태이고, 유사한 객체끼리의 묶음이 그룹(Label)으로 표현되어 있습니다. 그리고 이는 그래프 모델의 데이터 구현 방식과 매우 유사합니다. </p>

        </div>
    </div>,
    <div className="row content-row" key="s6">
        <div className="col-sm-3">
            <h3>Import CSV to AgensGraph</h3>
            <p>
                CSV형태의 데이터셋을 AgensGraph로 Import하려면 FDW(Foreign-Data Wrapper) 또는 COPY 명령어를 이용해야 합니다.
            </p>
            <hr />
            <p>
                <small>:help</small> <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>cypher</a>
                <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>MATCH</a>
            </p>
        </div>
        <div className="col-sm-9">
            <h4>Difference between FDW and COPY Command</h4>
            <p>
                FDW와 COPY명령어 모두, CSV파일을 Table화 하는데에 사용 되며 각 특징은 아래와 같습니다.
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">데이터셋</th>
                        <th scope="col">방식</th>
                        <th scope="col">비교</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">FDW</th>
                        <td>CSV, Absolute Path만 허용</td>
                        <td>Table조회시 File을 읽어서 테이블화</td>
                        <td>CSV 파일을 계속해서 유지하고 파일에 대한 변경내용이 테이블에 별도 작업 없이 반영되어야 할 때 사용</td>
                    </tr>
                    <tr>
                        <th scope="row">COPY</th>
                        <td>CSV, Network URL 허용</td>
                        <td>COPY 명령어를 수행시 CSV 데이터를 복사하여 테이블화</td>
                        <td>CSV 파일을 유지할 필요가 없고, Import후에는 DB에서 데이터를 관리 할 때 사용</td>
                    </tr>
                </tbody>
            </table>
            <p>이 튜토리얼에서는 OpenBrowser와 AgensGraph가 다른 서버에 설치되어 있다고 가정합니다. 따라서 사용자가 AgensGraph에서 Import할 CSV파일을 업로드 할 수도, 절대 경로를
            제공 할 수도 없다는 상황을 가정하기에, COPY명령어를 통하여 Import하는 튜토리얼을 진행합니다. FDW를 사용한 Import방식이 궁금하시면 Bitnine 홈페지이를 방문해
                <a target="_blank" rel="noopener noreferrer" href="https://bitnine.net/tutorial/tutorial_kor.html">튜토리얼</a> 를 참조하시기 바랍니다.</p>


        </div>
    </div>,
    <div className="row content-row" key="s7">
        <div className="col-sm-3">
            <h3>Import CSV to AgensGraph via COPY</h3>
            <p>
                COPY Command를 사용하여 CSV데이터를 Table에 적재합니다.
            </p>
            <hr />
            <p>
                <small>:help</small> <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>cypher</a>
                <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>MATCH</a>
            </p>
        </div>
        <div className="col-sm-9">
            <h4>Create Tables</h4>
            <figure>
                <aside className="warn">
                    CSV 파일 형태의 데이터셋을 적재할 각각의 Table을 생성합니다.
                </aside>
                <pre className="pre-scrollable code runnable">
{`CREATE TABLE categories (CategoryID int, CategoryName varchar(15), Description text, Picture bytea);
CREATE TABLE customers (CustomerID char(5), CompanyName varchar(40), ContactName varchar(30), ContactTitle varchar(30), Address varchar(60), City varchar(15), Region varchar(15), PostalCode varchar(10), Country varchar(15), Phone varchar(24), Fax varchar(24));
CREATE TABLE employees (EmployeeID int, LastName varchar(20), FirstName varchar(10), Title varchar(30), TitleOfCourtesy varchar(25), BirthDate date, HireDate date, Address varchar(60), City varchar(15), Region varchar(15), PostalCode varchar(10), Country varchar(15), HomePhone varchar(24), Extension varchar(4), Photo bytea, Notes text, ReportTo int, PhotoPath varchar(255));
CREATE TABLE employee_territories (EmployeeID int, TerritoryID varchar(20));
CREATE TABLE orders_details (orderID int, ProductID int, UnitPrice money, Quantity smallint, Discount real);
CREATE TABLE orders (orderID int, CustomerID char(5), EmployeeID int, orderDate date, RequiredDate date, ShippedDate date, ShipVia int, Freight money, ShipName varchar(40), ShipAddress varchar(60), ShipCity varchar(15), ShipRegion varchar(15), ShipPostalCode varchar(10), ShipCountry varchar(15));
CREATE TABLE products (ProductID int, ProductName varchar(40), SupplierID int, CategoryID int, QuantityPerUnit varchar(20), UnitPrice money, UnitsInStock smallint, UnitsOnorder smallint, ReorderLevel smallint, Discontinued bit);
CREATE TABLE regions (RegionID int, RegionDescription char(50));
CREATE TABLE shippers (ShipperID int, CompanyName varchar(40), Phone varchar(24));
CREATE TABLE suppliers (SupplierID int, CompanyName varchar(40), ContactName varchar(30), ContactTitle varchar(30), Address varchar(60), City varchar(15), Region varchar(15), PostalCode varchar(10), Country varchar(15), Phone varchar(24), Fax varchar(24), HomePage text);
CREATE TABLE territories (TerritoryID varchar(20), TerritoryDescription char(50), RegionID int);`}
                </pre>
            </figure>
            <h4>Data Copy to Table</h4>
            <figure>
                <aside className="warn">
                    생성 된 테이블에 CSV 데이터셋을 적재합니다.
                </aside>
                <pre className="pre-scrollable code runnable" style={{ maxHeight: '350px' }}>
                {`COPY categories (
    CategoryID,
    CategoryName,
    Description,
    Picture
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/categories.csv' csv header delimiter ',';

COPY customers (
    CustomerID,
    CompanyName,
    ContactName,
    ContactTitle,
    Address,
    City,
    Region,
    PostalCode,
    Country,
    Phone,
    Fax
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/customers.csv' csv header delimiter ',';

COPY employees (
    EmployeeID,
    LastName,
    FirstName,
    Title,
    TitleOfCourtesy,
    BirthDate,
    HireDate,
    Address,
    City,
    Region,
    PostalCode,
    Country,
    HomePhone,
    Extension,
    Photo,
    Notes,
    ReportTo,
    PhotoPath
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/employees.csv' csv header delimiter ',';

COPY employee_territories (
    EmployeeID,
    TerritoryID
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/employee_territories.csv' csv header delimiter ',';

COPY orders_details (
    orderID,
    ProductID,
    UnitPrice,
    Quantity,
    Discount
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/orders_details.csv' csv header delimiter ',';

COPY orders (
    orderID,
    CustomerID,
    EmployeeID,
    orderDate,
    RequiredDate,
    ShippedDate,
    ShipVia,
    Freight,
    ShipName,
    ShipAddress,
    ShipCity,
    ShipRegion,
    ShipPostalCode,
    ShipCountry
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/orders.csv' csv header delimiter ',';

COPY products (
    ProductID,
    ProductName,
    SupplierID,
    CategoryID,
    QuantityPerUnit,
    UnitPrice,
    UnitsInStock,
    UnitsOnorder,
    ReorderLevel,
    Discontinued
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/products.csv' csv header delimiter ',';

COPY regions (
    RegionID,
    RegionDescription
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/regions.csv' csv header delimiter ',';

COPY shippers (
    ShipperID,
    CompanyName,
    Phone
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/shippers.csv' csv header delimiter ',';

COPY suppliers (
    SupplierID,
    CompanyName,
    ContactName,
    ContactTitle,
    Address,
    City,
    Region,
    PostalCode,
    Country,
    Phone,
    Fax,
    HomePage
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/suppliers.csv' csv header delimiter ',';

COPY territories (
    TerritoryID,
    TerritoryDescription,
    RegionID
)
FROM PROGRAM 'curl https://raw.githubusercontent.com/KarlJeong/northwind_dataset/master/territories.csv' csv header delimiter ',';`}
                </pre>
            </figure>
        </div>
    </div>,
    <div className="row content-row" key="s9">
        <div className="col-sm-3">
            <h3>Import CSV to AgensGraph via COPY</h3>
            <p>
                적재된 Table의 데이터를 기반으로 Vertex 생성하고 효율적인 탐색을 위하여 Index를 생성합니다.
            </p>
            <hr />
            <p>
                <small>:help</small> <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>cypher</a>
                <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>MATCH</a>
            </p>
        </div>
        <div className="col-sm-9">
            <h4>Create Vertices</h4>
            <figure>
                <pre className="pre-scrollable code runnable">
{`LOAD FROM categories AS source CREATE (n:category=to_jsonb(source));
LOAD FROM customers AS source CREATE (n:customer=to_jsonb(source));
LOAD FROM employees AS source CREATE (n:employee=to_jsonb(source));
CREATE VLABEL IF NOT EXISTS "order";
LOAD FROM orders AS source CREATE (n:"order"=to_jsonb(source));
LOAD FROM products AS source CREATE (n:product=to_jsonb(source));
LOAD FROM regions AS source CREATE (n:region=to_jsonb(source));
LOAD FROM shippers AS source CREATE (n:shipper=to_jsonb(source));
LOAD FROM suppliers AS source CREATE (n:supplier=to_jsonb(source));
LOAD FROM territories AS source CREATE (n:territory=to_jsonb(source));`}
                </pre>
                <aside className="warn">
                    각 Table의 데이터를 로드하여 Vertex를 생성하였습니다. 이 때, Table 각 Column이 Vertex의 Property로 입력 됩니다.
                </aside>
            </figure>
            <h4>Create Indices</h4>
            <figure>
                <pre className="pre-scrollable code runnable">
{`CREATE PROPERTY INDEX ON category(categoryid);
CREATE PROPERTY INDEX ON customer(customerid);
CREATE PROPERTY INDEX ON employee(employeeid);
CREATE PROPERTY INDEX ON "order"(orderid);
CREATE PROPERTY INDEX ON product(productid);
CREATE PROPERTY INDEX ON region(regionid);
CREATE PROPERTY INDEX ON shipper(shipperid);
CREATE PROPERTY INDEX ON supplier(supplierid);
CREATE PROPERTY INDEX ON territory(territoryid);`}
                </pre>
                <aside className="warn">
                    생성한 Vertex별로 특정 속성에 Index를 생성합니다.
                </aside>
            </figure>

        </div>
    </div>,
    <div className="row content-row" key="s10">
        <div className="col-sm-3">
            <h3>Import CSV to AgensGraph via COPY</h3>
            <p>
                생성된 Vertex간의 Edge를 생성합니다.
            </p>
            <hr />
            <p>
                <small>:help</small> <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>cypher</a>
                <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>MATCH</a>
            </p>
        </div>
        <div className="col-sm-9">
            <h4>Create Edges</h4>
            <figure>
                <pre className="pre-scrollable code runnable" style={{ maxHeight: '350px' }}>
{`LOAD FROM orders_details AS source
MATCH (n:"order"),(m:product)
WHERE n.orderid=to_jsonb((source).orderid)
AND m.productid=to_jsonb((source).productid)
CREATE (n)-[r:ORDERS {unitprice:(source).unitprice,quantity:(source).quantity,discount:(source).discount}]->(m);

MATCH (n:employee),(m:employee)
WHERE m.employeeid=n.reportto
CREATE (n)-[r:REPORTS_TO]->(m);

MATCH (n:supplier),(m:product)
WHERE m.supplierid=n.supplierid
CREATE (n)-[r:SUPPLIES]->(m);

MATCH (n:product),(m:category)
WHERE n.categoryid=m.categoryid
CREATE (n)-[r:PART_OF]->(m);

MATCH (n:customer),(m:"order")
WHERE m.customerid=n.customerid
CREATE (n)-[r:PURCHASED]->(m);

MATCH (n:employee),(m:"order")
WHERE m.employeeid=n.employeeid
CREATE (n)-[r:SOLD]->(m);`}
                </pre>
                <aside className="warn">
                    위 과정을 모두 정상적으로 수행하셨다면 아래와 같은 그래프 모델이 생성됩니다. (OpenBrowser에서 쿼리 수행 시 그래프 레이아웃 및 쿼리 조건에 따라 보여지는 모습이 달라질 수 있습니다)

                </aside>
            </figure>
        </div>
    </div>,
    <div className="row content-row" key="s11">
        <div className="col-sm-3">
            <h3>Querying Graph Data</h3>
            <p>
                AgensGraph에 Northwind 데이터 적재가 완료되었다면 Cypher 쿼리로 데이터를 조회하여 데이터가 정상적으로 적재되었는지 확인합니다.
                이 튜토리얼에서는 이해를 돕기 위해 OpenBroswer에서 쿼리를 실행해 그래프를 시각화하여 제공합니다.
            </p>
            <hr />
            <p>
                <small>:help</small> <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>cypher</a>
                <a href="/#" className="badge badge-light"><span className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>MATCH</a>
            </p>
        </div>
        <div className="col-sm-9">
            <h4>전체 데이터 중 100개를 조회해보기</h4>
            <figure>
                <pre className="pre-scrollable code runnable" style={{ maxHeight: '350px' }}>
{`MATCH (c:customer)-[pc:purchased]->(o:"order")-[r:orders]->(p:product)
RETURN *
LIMIT 100;`}
                </pre>
                <aside className="warn">
                고객, 주문, 상품을 합쳐 최대 100개의 객체를 조회해보겠습니다.
                </aside>
            </figure>
            <h4>특정 고객의 데이터만 조회해보기</h4>
            <figure>
                <pre className="pre-scrollable code runnable" style={{ maxHeight: '350px' }}>
{`MATCH (c:customer)-[pc:PURCHASED]->(o:"order")-[r:ORDERS]->(p:product)-[po:PART_OF]->(ct:category)
WHERE c.customerid = 'ANTON'
RETURN *
LIMIT 100;`}
                </pre>
                <aside className="warn">
                여러 고객 중 'ANTON'이라는 이름을 가진 고객의 구매 데이터를 조회해보겠습니다.
                </aside>
            </figure>
        </div>
    </div>
]




