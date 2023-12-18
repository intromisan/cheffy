import 'package:equatable/equatable.dart';

class CategoryEntity extends Equatable {
  final String? id;
  final String? name;

  const CategoryEntity({this.id, this.name});

  @override
  List<Object?> get props {
    return [id, name];
  }
}
